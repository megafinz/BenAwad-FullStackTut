import prisma from '../../../prisma'
import type { CreatePostInput, CreatePostResponse } from './model'

export async function createPost(
  input: CreatePostInput,
  userId: number
): Promise<CreatePostResponse> {
  if (input.title.length <= 2) {
    return {
      errors: [
        {
          field: 'title',
          message: 'Title must be at least 3 characters long'
        }
      ]
    }
  }
  if (input.text.length <= 2) {
    return {
      errors: [
        {
          field: 'text',
          message: 'Text must be at least 3 characters long'
        }
      ]
    }
  }
  try {
    const newPost = await prisma.post.create({
      data: { ...input, authorId: userId }
    })
    return {
      post: newPost
    }
  } catch (error) {
    console.error('There a problem creating a Post', error)
    return {
      errors: [
        {
          message: 'There a problem creating a Post, please try again later'
        }
      ]
    }
  }
}
