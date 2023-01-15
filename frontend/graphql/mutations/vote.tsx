import { graphql } from '../_generated'

export const VOTE_MUT = graphql(`
  mutation Vote($input: VoteInput!) {
    vote(input: $input) {
      success
      errors {
        message
      }
    }
  }
`)
