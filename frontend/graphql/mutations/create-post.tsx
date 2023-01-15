import { graphql } from '../_generated'

export const CREATE_POST_MUT = graphql(`
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
