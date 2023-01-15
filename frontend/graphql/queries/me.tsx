import { graphql } from '../_generated'

export const ME_QUERY = graphql(`
  query Me {
    me {
      ...UserFields
    }
  }
`)
