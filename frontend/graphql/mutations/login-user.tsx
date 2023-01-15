import { graphql } from '../_generated'

export const LOGIN_USER_MUT = graphql(`
  mutation LoginUser($usernameOrEmail: String!, $password: String!) {
    loginUser(usernameOrEmail: $usernameOrEmail, password: $password) {
      user {
        ...UserFields
      }
    }
  }
`)
