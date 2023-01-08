import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query
} from 'type-graphql'
import argon2 from 'argon2'
import { ExpressContext } from 'apollo-server-express'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import prisma from '../../prisma'

@ObjectType()
class User {
  @Field()
  id!: number

  @Field()
  username!: string

  @Field()
  createdAt!: Date

  @Field()
  updatedAt!: Date
}

@InputType()
class RegisterUserInput {
  @Field()
  username!: string

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
  errors?: [ValidationError]

  @Field(() => User, { nullable: true })
  user?: User
}

@ObjectType()
class LoginUserResponse {
  @Field(() => User, { nullable: true })
  user?: User
}

export class UserResolver {
  @Mutation(() => RegisterUserResponse)
  async registerUser(
    @Arg('input') { username, password }: RegisterUserInput
  ): Promise<RegisterUserResponse> {
    if (username.length <= 3) {
      return {
        errors: [
          {
            field: 'username',
            message: 'Username length must be greater than 3'
          }
        ]
      }
    }
    if (password.length <= 3) {
      return {
        errors: [
          {
            field: 'password',
            message: 'Password length must be greater than 3'
          }
        ]
      }
    }
    const hashedPassword = await argon2.hash(password)
    try {
      const newUser = await prisma.user.create({
        data: { username, password: hashedPassword }
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
              message: 'Username already taken'
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
    @Arg('input') { username, password }: RegisterUserInput,
    @Ctx() { req }: ExpressContext
  ): Promise<LoginUserResponse> {
    const found = await prisma.user.findFirst({
      where: { username }
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

  @Query(() => User, { nullable: true })
  me(@Ctx() { req }: ExpressContext): Promise<User | null> {
    if (!req.session.userId) {
      return Promise.resolve(null)
    }
    return prisma.user.findFirst({ where: { id: req.session.userId } })
  }
}