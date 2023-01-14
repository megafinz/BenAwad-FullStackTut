import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import argon2 from 'argon2'
import prisma from '../../../prisma'
import type { RegisterUserResponse, UserCredentialsInput } from './_model'

export async function registerUser({
  username,
  email,
  password
}: UserCredentialsInput): Promise<RegisterUserResponse> {
  if (username.length <= 2) {
    return {
      errors: [
        {
          field: 'username',
          message: 'Username length must be greater than 2'
        }
      ]
    }
  }
  if (!email.match(/[^@\s]+@[^@\s]+/)) {
    return {
      errors: [
        {
          field: 'email',
          message: 'Incorrect email'
        }
      ]
    }
  }
  if (password.length <= 2) {
    return {
      errors: [
        {
          field: 'password',
          message: 'Password length must be greater than 2'
        }
      ]
    }
  }
  const hashedPassword = await argon2.hash(password)
  try {
    return {
      user: await prisma.user.create({
        data: { username, email, password: hashedPassword }
      })
    }
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      // TODO: this gives away that such user exists in the system, should we care tho?
      return {
        errors: [
          {
            field: 'username',
            message: 'Username or email already taken'
          },
          {
            field: 'email',
            message: 'Username or email already taken'
          }
        ]
      }
    }
    console.error(error)
    return {
      errors: [
        {
          message: 'Something went wrong'
        }
      ]
    }
  }
}
