import { graphql } from '../_generated'

export const CreatePostDoc = graphql(`
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      post {
        id
      }
      errors {
        field
        message
      }
    }
  }
`)
