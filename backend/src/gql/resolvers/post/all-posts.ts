import prisma from '../../../prisma'
import type { Post } from './model'

export function allPosts(): Promise<Post[]> {
  return prisma.post.findMany()
}
