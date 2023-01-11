import { ExpressContext } from 'apollo-server-express'
import argon2 from 'argon2'
import prisma from '../../../prisma'
import type { LoginUserResponse } from './model'

export async function loginUser(
  usernameOrEmail: string,
  password: string,
  { req }: ExpressContext
): Promise<LoginUserResponse> {
  const found = await prisma.user.findFirst({
    where: { OR: [{ username: usernameOrEmail }, { email: usernameOrEmail }] }
  })
  if (found) {
    const validPassword = await argon2.verify(found.password, password)
    if (validPassword) {
      if (!req.session) {
        console.error('Session is not available on this request')
        return {}
      }
      req.session.userId = found.id
      return {
        user: found
      }
    }
    return {}
  }
  // TODO: is this the correct way to avoid timing attacks here?
  await argon2.hash(password)
  return { user: undefined }
}
