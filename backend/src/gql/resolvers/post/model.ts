import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class Post {
  @Field()
  id!: number

  @Field()
  title!: string

  @Field()
  createdAt!: Date

  @Field()
  updatedAt!: Date
}
