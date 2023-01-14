import prisma from '../../../prisma'
import { mapPost, type Post } from './_model'

export async function post(id: number): Promise<Post | null> {
  const result = await prisma.post.findFirst({
    where: { id },
    include: { author: true, votes: { include: { user: true } } }
  })
  return result ? mapPost(result) : null
}
