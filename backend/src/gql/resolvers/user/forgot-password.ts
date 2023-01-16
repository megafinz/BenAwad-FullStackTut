import type { RedisClientType } from 'redis'
import { v4 } from 'uuid'
import { FORGOT_PASSWORD_PREFIX } from '../../../constants'
import config from '../../../lib/config'
import prisma from '../../../prisma'
import { sendForgotPasswordEmail } from '../../../utils/email'
import type { ForgotPasswordResponse } from './_model'

// For security purposes this should be the result for both success and failure paths.
const RESULT: ForgotPasswordResponse = {
  message: 'You will shortly receive a reset password link in an email'
}

export async function forgotPassword(
  email: string,
  { redis }: { redis: RedisClientType }
): Promise<ForgotPasswordResponse> {
  const user = await prisma.user.findFirst({ where: { email } })
  if (user) {
    const token = v4()
    await redis.v4.setEx(
      `${FORGOT_PASSWORD_PREFIX}${token}`,
      60 * 24, // expires in 1 day
      `${user.id}`
    )
    await sendForgotPasswordEmail({
      to: user.email,
      link: `<a href="${config.frontend.baseUrl}/change-password/${token}">Change Password</a>`
    })
  }
  return RESULT
}
