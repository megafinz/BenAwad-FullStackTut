import type { User as DbUser, Vote as DbVote } from '@prisma/client'
import {
  Field,
  InputType,
  Int,
  ObjectType,
  registerEnumType
} from 'type-graphql'
import { ValidationError } from '../models'
import { Post } from '../post'
import { User } from '../user'

export enum VoteValue {
  UP = 'UP',
  DOWN = 'DOWN'
}

registerEnumType(VoteValue, { name: 'VoteValue' })

@ObjectType()
export class PostVote {
  @Field(() => Int)
  userId!: number

  @Field(() => User)
  user!: User

  @Field(() => VoteValue)
  value!: VoteValue
}

@ObjectType()
export class UserVote extends PostVote {
  @Field(() => Int)
  postId!: number

  @Field(() => Post)
  post!: Post
}

@InputType()
export class VoteInput implements Partial<PostVote> {
  @Field(() => Int)
  postId!: number

  @Field(() => Int)
  userId!: number

  @Field(() => VoteValue)
  value!: VoteValue
}

@InputType()
export class UnvoteInput implements Partial<PostVote> {
  @Field(() => Int)
  postId!: number

  @Field(() => Int)
  userId!: number
}

@ObjectType()
export class VoteResponse {
  @Field()
  success!: boolean

  @Field(() => [ValidationError], { nullable: true })
  errors?: ValidationError[]
}

export function mapVote(dbVote: DbVote & { user: DbUser }): PostVote {
  return { ...dbVote, value: dbVote.value as VoteValue }
}
