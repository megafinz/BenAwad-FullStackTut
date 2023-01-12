import { ObjectType, Field, InputType, Int } from 'type-graphql'
import { ValidationError } from '../models'

@ObjectType()
export class Post {
  @Field(() => Int)
  id!: number

  @Field()
  title!: string

  @Field()
  text!: string

  @Field()
  createdAt!: Date

  @Field()
  updatedAt!: Date
}

@InputType()
export class CreatePostInput implements Partial<Post> {
  @Field()
  title!: string

  @Field()
  text!: string
}

@ObjectType()
export class CreatePostResponse {
  @Field(() => Post, { nullable: true })
  post?: Post

  @Field(() => [ValidationError], { nullable: true })
  errors?: ValidationError[]
}
