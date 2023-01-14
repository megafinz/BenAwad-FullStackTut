import prisma from '../../../prisma'
import type { PaginationInput } from '../models'
import { mapPost, type PostsResponse } from './_model'

export async function posts({
  limit,
  cursor
}: PaginationInput): Promise<PostsResponse> {
  const posts = await prisma.post.findMany({
    skip: cursor ? 1 : 0,
    take: limit,
    cursor: cursor
      ? {
          id: cursor
        }
      : undefined,
    orderBy: [{ createdAt: 'desc' }, { title: 'asc' }],
    include: { author: true, votes: { include: { user: true } } }
  })
  return {
    data: posts.map(mapPost),
    pagination: {
      hasMore: posts.length === limit,
      endCursor: posts.length > 0 ? posts[posts.length - 1].id : null
    }
  }
}
