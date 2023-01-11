import { ExpressContext } from 'apollo-server-express'
import prisma from '../../../prisma'
import type { User } from './model'

export function me({ req }: ExpressContext): Promise<User | null> {
  if (!req.session.userId) {
    return Promise.resolve(null)
  }
  return prisma.user.findFirst({ where: { id: req.session.userId } })
}
