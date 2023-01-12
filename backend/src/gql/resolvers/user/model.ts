import { ObjectType, Field, InputType, Int } from 'type-graphql'
import { ValidationError } from '../models'

@ObjectType()
export class User {
  @Field(() => Int)
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
export class UserCredentialsInput implements Partial<User> {
  @Field()
  username!: string

  @Field()
  email!: string

  @Field()
  password!: string
}

@ObjectType()
export class RegisterUserResponse {
  @Field(() => [ValidationError], { nullable: true })
  errors?: ValidationError[]

  @Field(() => User, { nullable: true })
  user?: User
}

@ObjectType()
export class LoginUserResponse {
  @Field(() => User, { nullable: true })
  user?: User
}

@ObjectType()
export class ForgotPasswordResponse {
  @Field()
  message!: string
}

@ObjectType()
export class ChangePasswordResponse {
  @Field(() => [ValidationError], { nullable: true })
  errors?: ValidationError[]

  @Field()
  success!: boolean
}
