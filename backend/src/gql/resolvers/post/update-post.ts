import prisma from '../../../prisma'
import { ValidationError } from '../models'
import { mapPost, UpdatePostInput, UpdatePostResponse } from './_model'

export async function updatePost(
  input: UpdatePostInput,
  userId: number
): Promise<UpdatePostResponse> {
  const errors: ValidationError[] = []
  if (typeof input.title !== 'undefined' && input.title.length <= 2) {
    errors.push({
      field: 'title',
      message: 'Title must be at least 3 characters long'
    })
  }
  if (typeof input.text !== 'undefined' && input.text.length <= 2) {
    errors.push({
      field: 'text',
      message: 'Text must be at least 3 characters long'
    })
  }
  if (errors.length > 0) {
    return {
      errors
    }
  }
  try {
    const updatedPost = await prisma.post.update({
      where: {
        postAndAuthorId: {
          id: input.id,
          authorId: userId
        }
      },
      data: {
        title: input.title,
        text: input.text
      },
      include: { author: true, votes: { include: { user: true } } }
    })
    return {
      post: mapPost(updatedPost)
    }
  } catch (error) {
    console.error('Error updating a post', error)
    return {
      errors: [
        {
          message:
            'There was a problem updating the Post, please try again later'
        }
      ]
    }
  }
}
