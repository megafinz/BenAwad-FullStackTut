import { graphql } from '../_generated'

export const FORGOT_PASSWORD_MUT = graphql(`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email) {
      message
    }
  }
`)
