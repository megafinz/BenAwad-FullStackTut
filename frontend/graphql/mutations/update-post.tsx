import { graphql } from '../_generated'

export const UPDATE_POST_MUT = graphql(`
  mutation UpdatePost($input: UpdatePostInput!) {
    updatePost(input: $input) {
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
