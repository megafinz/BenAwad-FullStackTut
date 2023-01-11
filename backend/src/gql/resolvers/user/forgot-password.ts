import { RedisClientType } from 'redis'
import { v4 } from 'uuid'
import { FORGOT_PASSWORD_PREFIX } from '../../../constants'
import prisma from '../../../prisma'
import { sendForgotPasswordEmail } from '../../../utils/email'
import { ForgotPasswordResponse } from './model'

export async function forgotPassword(
  email: string,
  { redisClient }: { redisClient: RedisClientType }
): Promise<ForgotPasswordResponse> {
  const result: ForgotPasswordResponse = {
    message: 'You will shortly receive a reset password link in an email'
  }
  const user = await prisma.user.findFirst({ where: { email } })
  if (user) {
    const token = `${FORGOT_PASSWORD_PREFIX}${v4()}`
    await redisClient.setEx(token, 60 * 24, `${user.id}`)
    // TODO: address from config
    await sendForgotPasswordEmail({
      to: user.email,
      link: `<a href="http://localhost:3000/change-password/${token}">Change Password</a>`
    })
  }
  return result
}
