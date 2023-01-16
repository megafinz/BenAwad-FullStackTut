import { graphql } from '../_generated'

export const DELETE_POST_MUT = graphql(`
  mutation DeletePost($id: Int!) {
    deletePost(id: $id) {
      success
      errors {
        message
      }
    }
  }
`)
