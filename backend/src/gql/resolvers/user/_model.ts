import { ObjectType, Field, InputType, Int } from 'type-graphql'
import { ValidationError } from '../models'
import { Post } from '../post'
import { PostVote } from '../vote'

@ObjectType()
export class User {
  @Field(() => Int)
  id!: number

  @Field()
  username!: string

  @Field()
  email!: string
}

@ObjectType()
export class UserDetails extends User {
  @Field()
  createdAt!: Date

  @Field()
  updatedAt!: Date

  @Field(() => [Post])
  posts!: Post[]

  @Field(() => [PostVote])
  votes!: PostVote[]
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
