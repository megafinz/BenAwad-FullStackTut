import { graphql } from '../_generated'

export const RegisterUserDoc = graphql(`
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
