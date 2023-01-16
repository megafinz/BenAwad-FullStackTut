import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import prisma from '../../../prisma'
import { DeletePostResponse } from './_model'

export async function deletePost(
  id: number,
  userId: number
): Promise<DeletePostResponse> {
  try {
    const result = await prisma.post.deleteMany({
      where: { AND: [{ id }, { authorId: userId }] }
    })
    return {
      success: result.count > 0,
      errors:
        result.count === 0
          ? [
              {
                message:
                  "Post is either not found or you don't have the right to delete it"
              }
            ]
          : undefined
    }
  } catch (error) {
    if (!(error instanceof PrismaClientKnownRequestError)) {
      console.error(error)
    }
    return {
      success: false,
      errors: [
        {
          message: 'Something went wrong while trying to delete the Post'
        }
      ]
    }
  }
}
