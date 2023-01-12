import { ExpressContext } from 'apollo-server-express'
import { Arg, Ctx, Mutation, Query, UseMiddleware } from 'type-graphql'
import { auth } from '../../middleware'
import { allPosts } from './all-posts'
import { createPost } from './create-post'
import { deletePost } from './delete-post'
import { CreatePostInput, CreatePostResponse, Post } from './model'
import { post } from './post'
import { updatePost } from './update-post'

export class PostResolver {
  @Query(() => [Post])
  allPosts(): Promise<Post[]> {
    return allPosts()
  }

  @Query(() => Post, { nullable: true })
  post(@Arg('id') id: number): Promise<Post | null> {
    return post(id)
  }

  @Mutation(() => CreatePostResponse)
  @UseMiddleware(auth)
  createPost(
    @Arg('input') input: CreatePostInput,
    @Ctx() { req }: ExpressContext
  ): Promise<CreatePostResponse> {
    return createPost(input, req.session.userId!)
  }

  @Mutation(() => Post, { nullable: true })
  @UseMiddleware(auth)
  async updatePost(
    @Arg('id') id: number,
    @Arg('title', { nullable: true }) title: string
  ): Promise<Post | null> {
    return updatePost(id, title)
  }

  @Mutation(() => Boolean)
  @UseMiddleware(auth)
  async deletePost(@Arg('id') id: number): Promise<boolean> {
    return deletePost(id)
  }
}
