import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { ExpressContext } from 'apollo-server-express'
import argon2 from 'argon2'
import { RedisClientType } from 'redis'
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query
} from 'type-graphql'
import { v4 } from 'uuid'
import { COOKIE_NAME, FORGOT_PASSWORD_PREFIX } from '../../constants'
import prisma from '../../prisma'
import { sendForgotPasswordEmail } from '../../utils/email'

@ObjectType()
class User {
  @Field()
  id!: number

  @Field()
  username!: string

  @Field()
  email!: string

  @Field()
  createdAt!: Date

  @Field()
  updatedAt!: Date
}

@InputType()
class UserCredentialsInput {
  @Field()
  username!: string

  @Field()
  email!: string

  @Field()
  password!: string
}

@ObjectType()
class ValidationError {
  @Field()
  field?: string

  @Field()
  message!: string
}

@ObjectType()
class RegisterUserResponse {
  @Field(() => [ValidationError], { nullable: true })
  errors?: ValidationError[]

  @Field(() => User, { nullable: true })
  user?: User
}

@ObjectType()
class LoginUserResponse {
  @Field(() => User, { nullable: true })
  user?: User
}

@ObjectType()
class ForgotPasswordResponse {
  @Field()
  message!: string
}

export class UserResolver {
  @Mutation(() => RegisterUserResponse)
  async registerUser(
    @Arg('input') { username, email, password }: UserCredentialsInput
  ): Promise<RegisterUserResponse> {
    if (username.length <= 2) {
      return {
        errors: [
          {
            field: 'username',
            message: 'Username length must be greater than 2'
          }
        ]
      }
    }
    if (!email.match(/[^@\s]+@[^@\s]+/)) {
      return {
        errors: [
          {
            field: 'email',
            message: 'Incorrect email'
          }
        ]
      }
    }
    if (password.length <= 2) {
      return {
        errors: [
          {
            field: 'password',
            message: 'Password length must be greater than 2'
          }
        ]
      }
    }
    const hashedPassword = await argon2.hash(password)
    try {
      const newUser = await prisma.user.create({
        data: { username, email, password: hashedPassword }
      })
      return {
        user: newUser
      }
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        // TODO: this gives away that such user exists in the system, should we care tho?
        return {
          errors: [
            {
              field: 'username',
              message: 'Username or email already taken'
            },
            {
              field: 'email',
              message: 'Username or email already taken'
            }
          ]
        }
      }
      console.error(error)
      return {
        errors: [
          {
            message: 'Something went wrong'
          }
        ]
      }
    }
  }

  @Mutation(() => LoginUserResponse)
  async loginUser(
    @Arg('usernameOrEmail') usernameOrEmail: string,
    @Arg('password') password: string,
    @Ctx() { req }: ExpressContext
  ): Promise<LoginUserResponse> {
    const found = await prisma.user.findFirst({
      where: { OR: [{ username: usernameOrEmail }, { email: usernameOrEmail }] }
    })
    if (found) {
      const validPassword = await argon2.verify(found.password, password)
      if (validPassword) {
        if (!req.session) {
          console.error('Session is not available on this request')
          return {}
        }
        req.session.userId = found.id
        return {
          user: found
        }
      }
      return {}
    }
    // TODO: is this the correct way to avoid timing attacks here?
    await argon2.hash(password)
    return { user: undefined }
  }

  @Mutation(() => Boolean)
  logoutUser(@Ctx() { req, res }: ExpressContext) {
    return new Promise(resolve =>
      req.session.destroy(error => {
        if (error) {
          console.error('There was an issue trying to destroy session', error)
          resolve(false)
        } else {
          res.clearCookie(COOKIE_NAME)
          resolve(true)
        }
      })
    )
  }

  @Mutation(() => ForgotPasswordResponse)
  async forgotPassword(
    @Arg('email') email: string,
    @Ctx() { redisClient }: { redisClient: RedisClientType }
  ): Promise<ForgotPasswordResponse> {
    const result: ForgotPasswordResponse = {
      message: 'You will shortly receive a reset password link in an email'
    }
    const user = await prisma.user.findFirst({ where: { email } })
    if (user) {
      const token = `${FORGOT_PASSWORD_PREFIX}${v4()}`
      await redisClient.setEx(token, 60 * 24, `${user.id}`)
      // TODO: address from config
      await sendForgotPasswordEmail({
        to: user.email,
        link: `<a href="http://localhost:4000/api/v1/change-password/${token}">Change Password</a>`
      })
    }
    return result
  }

  @Query(() => User, { nullable: true })
  me(@Ctx() { req }: ExpressContext): Promise<User | null> {
    if (!req.session.userId) {
      return Promise.resolve(null)
    }
    return prisma.user.findFirst({ where: { id: req.session.userId } })
  }
}
