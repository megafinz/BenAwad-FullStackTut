import { graphql } from '../_generated'

export const UNVOTE_MUT = graphql(`
  mutation Unvote($input: UnvoteInput!) {
    unvote(input: $input) {
      success
      errors {
        message
      }
    }
  }
`)
