import { graphql } from '../_generated'

export const MeDoc = graphql(/* GraphQL */ `
  query Me {
    me {
      ...UserFields
    }
  }
`)
