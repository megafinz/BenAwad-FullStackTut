import prisma from '../../../prisma'
import type { Post } from './model'

export function allPosts(limit: number, cursor?: string): Promise<Post[]> {
  return prisma.post.findMany({
    where: { createdAt: { gt: cursor || undefined } },
    take: limit,
    orderBy: { createdAt: 'desc' }
  })
}
