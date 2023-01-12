import { ExpressContext } from 'apollo-server-express'
import { RedisClientType } from 'redis'
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { changePassword } from './change-password'
import { forgotPassword } from './forgot-password'
import { loginUser } from './login-user'
import { logoutUser } from './logout-user'
import { me } from './me'
import {
  ChangePasswordResponse,
  ForgotPasswordResponse,
  LoginUserResponse,
  RegisterUserResponse,
  User,
  UserCredentialsInput
} from './model'
import { registerUser } from './register-user'

@Resolver(() => User)
export class UserResolver {
  @Mutation(() => RegisterUserResponse)
  registerUser(
    @Arg('input') input: UserCredentialsInput
  ): Promise<RegisterUserResponse> {
    return registerUser(input)
  }

  @Mutation(() => LoginUserResponse)
  loginUser(
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
  forgotPassword(
    @Arg('email') email: string,
    @Ctx() ctx: { redis: RedisClientType }
  ): Promise<ForgotPasswordResponse> {
    return forgotPassword(email, ctx)
  }

  @Mutation(() => ChangePasswordResponse)
  changePassword(
    @Arg('newPassword') newPassword: string,
    @Arg('token') token: string,
    @Ctx() ctx: { redis: RedisClientType }
  ): Promise<ChangePasswordResponse> {
    return changePassword(newPassword, token, ctx)
  }

  @Query(() => User, { nullable: true })
  me(@Ctx() ctx: ExpressContext): Promise<User | null> {
    return me(ctx)
  }
}
