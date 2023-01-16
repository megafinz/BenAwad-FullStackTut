import { Post as DbPost, User as DbUser, Vote as DbVote } from '@prisma/client'
import { Field, InputType, Int, ObjectType } from 'type-graphql'
import { PaginationInfo, ValidationError } from '../models'
import { User } from '../user'
import { mapVote, PostVote } from '../vote'

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

  @Field(() => User)
  author!: User

  votes!: PostVote[]
}

@InputType()
export class CreatePostInput implements Partial<Post> {
  @Field()
  title!: string

  @Field()
  text!: string
}

@InputType()
export class UpdatePostInput implements Partial<Post> {
  @Field()
  id!: number

  @Field()
  title?: string

  @Field()
  text?: string
}

@ObjectType()
export class CreatePostResponse {
  @Field(() => Post, { nullable: true })
  post?: Post

  @Field(() => [ValidationError], { nullable: true })
  errors?: ValidationError[]
}

@ObjectType()
export class PostsResponse {
  @Field(() => [Post])
  data!: Post[]

  @Field(() => PaginationInfo)
  pagination!: PaginationInfo
}

@ObjectType()
export class DeletePostResponse {
  @Field()
  success!: boolean

  @Field(() => [ValidationError], { nullable: true })
  errors?: ValidationError[]
}

@ObjectType()
export class UpdatePostResponse {
  @Field(() => Post, { nullable: true })
  post?: Post

  @Field(() => [ValidationError], { nullable: true })
  errors?: ValidationError[]
}

export function mapPost(
  dbPost: DbPost & { author: DbUser; votes: (DbVote & { user: DbUser })[] }
): Post {
  return { ...dbPost, votes: dbPost.votes.map(mapVote) }
}
