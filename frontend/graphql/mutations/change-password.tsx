import { graphql } from '../_generated'

export const ChangePasswordDoc = graphql(`
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
