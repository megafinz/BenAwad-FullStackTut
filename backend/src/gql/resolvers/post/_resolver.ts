import { ExpressContext } from 'apollo-server-express'
import { Max, Min } from 'class-validator'
import {
  Arg,
  Args,
  ArgsType,
  Ctx,
  Field,
  FieldResolver,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware
} from 'type-graphql'
import { auth } from '../../middleware'
import { allPosts } from './all-posts'
import { createPost } from './create-post'
import { deletePost } from './delete-post'
import { CreatePostInput, CreatePostResponse, Post } from './model'
import { post } from './post'
import { updatePost } from './update-post'

@ArgsType()
class AllPostsArgs {
  @Field(() => Int, { defaultValue: 10 })
  @Min(1)
  @Max(50)
  limit!: number

  @Field(() => String, { nullable: true })
  cursor?: string
}

@Resolver(() => Post)
export class PostResolver {
  @FieldResolver(() => String)
  textSnippet(@Root() root: Post) {
    return root.text.slice(0, 50)
  }

  @Query(() => [Post])
  allPosts(@Args() { limit, cursor }: AllPostsArgs): Promise<Post[]> {
    return allPosts(limit, cursor)
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
