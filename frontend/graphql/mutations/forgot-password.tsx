import { graphql } from '../_generated'

export const ForgotPasswordDoc = graphql(`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email) {
      message
    }
  }
`)
