import { graphql } from '../_generated'

export const REGISTER_USER_MUT = graphql(`
  mutation RegisterUser($input: UserCredentialsInput!) {
    registerUser(input: $input) {
      errors {
        field
        message
      }
      user {
        ...UserFields
      }
    }
  }
`)
