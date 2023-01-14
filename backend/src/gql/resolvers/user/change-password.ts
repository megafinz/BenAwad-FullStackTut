import argon2 from 'argon2'
import type { RedisClientType } from 'redis'
import { FORGOT_PASSWORD_PREFIX } from '../../../constants'
import prisma from '../../../prisma'
import type { ChangePasswordResponse } from './_model'

const SUCCESS_RESULT: ChangePasswordResponse = {
  success: true
}

const INVALID_PASSWORD_RESULT: ChangePasswordResponse = {
  success: false,
  errors: [
    {
      field: 'password',
      message: 'Password length must be greater than 2'
    }
  ]
}

const ERROR_RESULT: ChangePasswordResponse = {
  success: false,
  errors: [
    {
      field: 'newPassword',
      message:
        'Invalid password reset token, make sure the password change link is correct or request a new one'
    }
  ]
}

export async function changePassword(
  newPassword: string,
  token: string,
  { redis }: { redis: RedisClientType }
): Promise<ChangePasswordResponse> {
  if (newPassword.length <= 2) {
    return INVALID_PASSWORD_RESULT
  }
  const key = `${FORGOT_PASSWORD_PREFIX}${token}`
  const userId = parseInt(await redis.v4.get(key))
  if (!userId) {
    return ERROR_RESULT
  }
  await redis.v4.delete(key)
  const newPasswordHash = await argon2.hash(newPassword)
  try {
    await prisma.user.update({
      where: { id: userId },
      data: { password: newPasswordHash }
    })
  } catch (error) {
    console.log('Failed to change user password', error)
    return ERROR_RESULT
  }
  return SUCCESS_RESULT
}
