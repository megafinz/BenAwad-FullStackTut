import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import prisma from '../../../prisma'
import type { Post } from './model'

export async function updatePost(
  id: number,
  title?: string
): Promise<Post | null> {
  try {
    return await prisma.post.update({ where: { id }, data: { title } })
  } catch (error) {
    if (!(error instanceof PrismaClientKnownRequestError)) {
      console.error(error)
    }
    return null
  }
}
