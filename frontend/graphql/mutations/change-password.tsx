import { graphql } from '../_generated'

export const CHANGE_PASSWORD_MUT = graphql(`
  mutation ChangePassword($newPassword: String!, $token: String!) {
    changePassword(newPassword: $newPassword, token: $token) {
      success
      errors {
        field
        message
      }
    }
  }
`)
