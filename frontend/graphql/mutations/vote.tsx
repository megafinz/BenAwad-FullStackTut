import { graphql } from '../_generated'

export const VoteDoc = graphql(`
  mutation Vote($input: VoteInput!) {
    vote(input: $input) {
      success
      errors {
        message
      }
    }
  }
`)
