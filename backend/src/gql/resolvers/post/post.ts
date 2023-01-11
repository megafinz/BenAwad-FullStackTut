import prisma from '../../../prisma'
import type { Post } from './model'

export function post(id: number): Promise<Post | null> {
  return prisma.post.findFirst({ where: { id } })
}
