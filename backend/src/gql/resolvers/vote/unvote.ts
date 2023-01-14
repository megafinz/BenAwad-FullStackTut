import prisma from '../../../prisma'
import type { UnvoteInput, VoteResponse } from './_model'

export async function unvote({
  userId,
  postId
}: UnvoteInput): Promise<VoteResponse> {
  try {
    // TODO: use delete instead?
    await prisma.vote.deleteMany({ where: { userId, postId } })
    return {
      success: true
    }
  } catch (error) {
    console.log('Error removing a Vote', error)
    return {
      success: false,
      errors: [
        {
          message:
            'There was a problem with removing your Vote, please try again later'
        }
      ]
    }
  }
}
