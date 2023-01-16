import prisma from '../../../prisma'
import { ValidationError } from '../models'
import { VoteValue } from '../vote'
import { CreatePostInput, CreatePostResponse, mapPost } from './_model'

export async function createPost(
  input: CreatePostInput,
  userId: number
): Promise<CreatePostResponse> {
  const errors: ValidationError[] = []
  if (input.title.length <= 2) {
    errors.push({
      field: 'title',
      message: 'Title must be at least 3 characters long'
    })
  }
  if (input.text.length <= 2) {
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
    const newPost = await prisma.post.create({
      data: {
        ...input,
        authorId: userId,
        votes: {
          create: {
            userId,
            value: VoteValue.UP
          }
        }
      },
      include: { author: true, votes: { include: { user: true } } }
    })
    return {
      post: mapPost(newPost)
    }
  } catch (error) {
    console.error('Error creating a Post', error)
    return {
      errors: [
        {
          message: 'There was a problem creating a Post, please try again later'
        }
      ]
    }
  }
}
