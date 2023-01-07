import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { Arg, Field, Mutation, ObjectType, Query } from 'type-graphql'
import prisma from '../../prisma'

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

export class PostResolver {
  @Query(() => [Post])
  allPosts(): Promise<Post[]> {
    return prisma.post.findMany()
  }

  @Query(() => Post, { nullable: true })
  post(@Arg('id') id: number): Promise<Post | null> {
    return prisma.post.findFirst({ where: { id } })
  }

  @Mutation(() => Post)
  createPost(@Arg('title') title: string): Promise<Post> {
    return prisma.post.create({ data: { title } })
  }

  @Mutation(() => Post, { nullable: true })
  async updatePost(
    @Arg('id') id: number,
    @Arg('title', { nullable: true }) title: string
  ): Promise<Post | null> {
    try {
      return await prisma.post.update({ where: { id }, data: { title } })
    } catch (error) {
      if (!(error instanceof PrismaClientKnownRequestError)) {
        console.error(error)
      }
      return null
    }
  }

  @Mutation(() => Boolean)
  async deletePost(@Arg('id') id: number): Promise<boolean> {
    try {
      await prisma.post.delete({ where: { id } })
      return true
    } catch (error) {
      if (!(error instanceof PrismaClientKnownRequestError)) {
        console.error(error)
      }
      return false
    }
  }
}
