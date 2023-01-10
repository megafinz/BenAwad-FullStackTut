import { Box, Button, Divider } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { NextPage } from 'next'
import NextLink from 'next/link'
import { useMutation } from 'urql'
import InputField from '~/components/InputField'
import Layout from '~/components/Layout'
import { ForgotPasswordDoc } from '~/graphql/mutations'
import { withUrqlClient } from '~/lib/urql'

const ForgotPasswordPage: NextPage = () => {
  const [_, forgotPassword] = useMutation(ForgotPasswordDoc)
  return (
    <Layout variant="small" title="Forgot Password">
      <Formik
        initialValues={{ email: '' }}
        onSubmit={async values => {
          const result = await forgotPassword(values)
          if (!result.data?.forgotPassword.message) {
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

export default withUrqlClient()(ForgotPasswordPage)
