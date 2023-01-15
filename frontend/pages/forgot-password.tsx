import { useMutation } from '@apollo/client'
import { Box, Button, Divider, Heading } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { NextPage } from 'next'
import NextLink from 'next/link'
import InputField from '~/components/InputField'
import Layout from '~/components/Layout'
import { FORGOT_PASSWORD_MUT } from '~/graphql/mutations'

// TODO: display gql errors properly
const ForgotPasswordPage: NextPage = () => {
  const [forgotPassword] = useMutation(FORGOT_PASSWORD_MUT)
  return (
    <Layout variant="small" title="Forgot Password">
      <Heading>Forgot Password</Heading>
      <Divider />
      <Formik
        initialValues={{ email: '' }}
        onSubmit={async values => {
          const result = await forgotPassword({ variables: { ...values } })
          if (result.errors) {
            console.error(
              '❗ Something went wrong while attempting to reset password',
              result.errors
            )
            alert('❗ Something went wrong while attempting to reset password')
          } else if (!result.data?.forgotPassword.message) {
            alert('❗ Something went wrong while attempting to reset password')
          } else {
            alert(`✅ ${result.data.forgotPassword.message}`)
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box sx={{ display: 'flex', flexDir: 'column', gap: '20px' }}>
              <InputField name="email" label="Email" placeholder="Email" />
              <Button type="submit" isLoading={isSubmitting} colorScheme="teal">
                Reset Password
              </Button>
              <Divider />
              <Button colorScheme="teal" variant="link">
                <NextLink href="/login">Login</NextLink>
              </Button>
              <Button colorScheme="teal" variant="link">
                <NextLink href="/register">Register</NextLink>
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Layout>
  )
}

export default ForgotPasswordPage
