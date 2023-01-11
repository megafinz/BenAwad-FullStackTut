import { Arg, Mutation, Query } from 'type-graphql'
import { allPosts } from './all-posts'
import { Post } from './model'

export class PostResolver {
  @Query(() => [Post])
  allPosts(): Promise<Post[]> {
    return allPosts()
  }

  @Query(() => Post, { nullable: true })
  post(@Arg('id') id: number): Promise<Post | null> {
    return this.post(id)
  }

  @Mutation(() => Post)
  createPost(@Arg('title') title: string): Promise<Post> {
    return this.createPost(title)
  }

  @Mutation(() => Post, { nullable: true })
  async updatePost(
    @Arg('id') id: number,
    @Arg('title', { nullable: true }) title: string
  ): Promise<Post | null> {
    return this.updatePost(id, title)
  }

  @Mutation(() => Boolean)
  async deletePost(@Arg('id') id: number): Promise<boolean> {
    return this.deletePost(id)
  }
}
