import type { ExpressContext } from 'apollo-server-express'
import prisma from '../../../prisma'
import type { User } from './_model'

export async function me({ req }: ExpressContext): Promise<User | null> {
  if (!req.session.userId) {
    return null
  }
  return await prisma.user.findFirst({
    where: { id: req.session.userId }
  })
}
