import { Max, Min } from 'class-validator'
import { Field, InputType, Int, ObjectType } from 'type-graphql'

@ObjectType()
export class ValidationError {
  @Field()
  field?: string

  @Field()
  message!: string
}

@InputType()
export class PaginationInput {
  @Field(() => Int)
  @Min(1)
  @Max(50)
  limit!: number

  @Field(() => Int, { nullable: true })
  cursor?: number
}

@ObjectType()
export class PaginationInfo {
  @Field()
  hasMore!: boolean

  @Field(() => Int)
  endCursor!: number | null
}
