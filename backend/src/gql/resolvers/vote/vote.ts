import prisma from '../../../prisma'
import type { VoteInput, VoteResponse } from './_model'

export async function vote({
  userId,
  postId,
  value
}: VoteInput): Promise<VoteResponse> {
  try {
    await prisma.vote.upsert({
      where: { userId_postId: { userId, postId } },
      create: { userId, postId, value },
      update: { value }
    })
    return {
      success: true
    }
  } catch (error) {
    console.error('Error creating a Vote', error)
    return {
      success: false,
      errors: [
        {
          message: 'There was an error making a Vote, please try again later'
        }
      ]
    }
  }
}
