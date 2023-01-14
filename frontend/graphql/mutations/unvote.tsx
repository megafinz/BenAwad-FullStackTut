import { graphql } from '../_generated'

export const UnvoteDoc = graphql(`
  mutation Unvote($input: UnvoteInput!) {
    unvote(input: $input) {
      success
      errors {
        message
      }
    }
  }
`)
