import { graphql } from '../_generated'

export const LoginUserDoc = graphql(`
  mutation LoginUser($usernameOrEmail: String!, $password: String!) {
    loginUser(usernameOrEmail: $usernameOrEmail, password: $password) {
      user {
        ...UserFields
      }
    }
  }
`)
