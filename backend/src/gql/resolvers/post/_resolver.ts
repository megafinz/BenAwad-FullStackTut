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
import { PostVote, VoteValue } from '../vote'
import { createPost } from './create-post'
import { deletePost } from './delete-post'
import { post } from './post'
import { posts } from './posts'
import { updatePost } from './update-post'
import {
  CreatePostInput,
  CreatePostResponse,
  DeletePostResponse,
  Post,
  PostsResponse,
  UpdatePostInput,
  UpdatePostResponse
} from './_model'

@Resolver(() => Post)
export class PostResolver {
  @FieldResolver(() => String)
  textSnippet(@Root() root: Post) {
    return root.text.length > 50
      ? root.text.slice(0, 50).trim() + '…'
      : root.text
  }

  @FieldResolver(() => Int)
  score(@Root() root: Post) {
    const value = (voteValue: VoteValue) => (voteValue === 'UP' ? 1 : -1)
    return root.votes.reduce((acc, curr) => acc + value(curr.value), 0)
  }

  @FieldResolver(() => PostVote, { nullable: true })
  myVote(@Root() root: Post, @Ctx() { req }: ExpressContext): PostVote | null {
    const myVotes = root.votes.filter(v => v.userId === req.session.userId)
    return myVotes.length === 1 ? myVotes[0] : null
  }

  @Query(() => PostsResponse)
  posts(@Arg('input') input: PaginationInput): Promise<PostsResponse> {
    return posts(input)
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

  @Mutation(() => DeletePostResponse)
  @UseMiddleware(auth)
  deletePost(
    @Arg('id', () => Int) id: number,
    @Ctx() { req }: ExpressContext
  ): Promise<DeletePostResponse> {
    return deletePost(id, req.session.userId!)
  }

  @Mutation(() => UpdatePostResponse)
  @UseMiddleware(auth)
  updatePost(
    @Arg('input') input: UpdatePostInput,
    @Ctx() { req }: ExpressContext
  ): Promise<UpdatePostResponse> {
    return updatePost(input, req.session.userId!)
  }
}
