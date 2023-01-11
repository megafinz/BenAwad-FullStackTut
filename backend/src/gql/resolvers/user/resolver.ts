import { ExpressContext } from 'apollo-server-express'
import { RedisClientType } from 'redis'
import { Arg, Ctx, Mutation, Query } from 'type-graphql'
import { forgotPassword } from './forgot-password'
import { loginUser } from './login-user'
import { logoutUser } from './logout-user'
import { me } from './me'
import {
  RegisterUserResponse,
  UserCredentialsInput,
  LoginUserResponse,
  ForgotPasswordResponse,
  User
} from './model'
import { registerUser } from './register-user'

export class UserResolver {
  @Mutation(() => RegisterUserResponse)
  async registerUser(
    @Arg('input') input: UserCredentialsInput
  ): Promise<RegisterUserResponse> {
    return registerUser(input)
  }

  @Mutation(() => LoginUserResponse)
  async loginUser(
    @Arg('usernameOrEmail') usernameOrEmail: string,
    @Arg('password') password: string,
    @Ctx() ctx: ExpressContext
  ): Promise<LoginUserResponse> {
    return loginUser(usernameOrEmail, password, ctx)
  }

  @Mutation(() => Boolean)
  logoutUser(@Ctx() ctx: ExpressContext) {
    return logoutUser(ctx)
  }

  @Mutation(() => ForgotPasswordResponse)
  async forgotPassword(
    @Arg('email') email: string,
    @Ctx() ctx: { redisClient: RedisClientType }
  ): Promise<ForgotPasswordResponse> {
    return forgotPassword(email, ctx)
  }

  @Query(() => User, { nullable: true })
  me(@Ctx() ctx: ExpressContext): Promise<User | null> {
    return me(ctx)
  }
}
