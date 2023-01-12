import { ExpressContext } from 'apollo-server-express'
import {
  Arg,
  Ctx,
  FieldResolver,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware
} from 'type-graphql'
import { auth } from '../../middleware'
import { PaginationInput } from '../models'
import { createPost } from './create-post'
import { deletePost } from './delete-post'
import {
  CreatePostInput,
  CreatePostResponse,
  Post,
  PostsResponse
} from './model'
import { post } from './post'
import { posts } from './posts'
import { updatePost } from './update-post'

@Resolver(() => Post)
export class PostResolver {
  @FieldResolver(() => String)
  textSnippet(@Root() root: Post) {
    return root.text.slice(0, 50)
  }

  @Query(() => PostsResponse)
  posts(@Arg('query') query: PaginationInput): Promise<PostsResponse> {
    return posts(query)
  }

  @Query(() => Post, { nullable: true })
  post(@Arg('id', () => Int) id: number): Promise<Post | null> {
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
    @Arg('id', () => Int) id: number,
    @Arg('title', { nullable: true }) title: string
  ): Promise<Post | null> {
    return updatePost(id, title)
  }

  @Mutation(() => Boolean)
  @UseMiddleware(auth)
  async deletePost(@Arg('id', () => Int) id: number): Promise<boolean> {
    return deletePost(id)
  }
}
