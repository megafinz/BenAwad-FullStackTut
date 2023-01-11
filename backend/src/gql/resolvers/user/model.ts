import { ObjectType, Field, InputType } from 'type-graphql'

@ObjectType()
export class User {
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
export class UserCredentialsInput {
  @Field()
  username!: string

  @Field()
  email!: string

  @Field()
  password!: string
}

@ObjectType()
export class ValidationError {
  @Field()
  field?: string

  @Field()
  message!: string
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
