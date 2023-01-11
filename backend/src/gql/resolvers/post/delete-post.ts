import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import prisma from '../../../prisma'

export async function deletePost(id: number): Promise<boolean> {
  try {
    await prisma.post.delete({ where: { id } })
    return true
  } catch (error) {
    if (!(error instanceof PrismaClientKnownRequestError)) {
      console.error(error)
    }
    return false
  }
}
