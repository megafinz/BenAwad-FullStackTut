import { graphql } from '../_generated'

export const LoginUserDoc = graphql(`
  mutation LoginUser($input: UserCredentialsInput!) {
    loginUser(input: $input) {
      user {
        ...UserFields
      }
    }
  }
`)
