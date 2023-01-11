import prisma from '../../../prisma'
import type { Post } from './model'

export function createPost(title: string): Promise<Post> {
  return prisma.post.create({ data: { title } })
}
