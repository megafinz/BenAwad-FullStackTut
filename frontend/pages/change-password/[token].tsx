import { Box, Button, Divider } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { NextPage } from 'next'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useMutation } from 'urql'
import InputField from '~/components/InputField'
import Layout from '~/components/Layout'
import { ChangePasswordDoc } from '~/graphql/mutations'
import { withUrqlClient } from '~/lib/urql'
import { toErrorMap } from '~/utils'

const ChangePasswordPage: NextPage<{ token: string }> = ({ token }) => {
  const router = useRouter()
  const [_, changePassword] = useMutation(ChangePasswordDoc)
  return (
    <Layout variant="small" title="Change Password">
      <Formik
        initialValues={{ newPassword: '', token }}
        onSubmit={async (values, { setErrors }) => {
          const result = await changePassword(values)
          if (result.data?.changePassword.success) {
            alert('✅ Password has been changed successfully')
            router.push('/login')
          } else if (result.data?.changePassword.errors) {
            setErrors(toErrorMap(result.data.changePassword.errors))
          } else {
            alert('❗ Something went wrong while attempting to change password')
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box sx={{ display: 'flex', flexDir: 'column', gap: '20px' }}>
              <InputField
                name="newPassword"
                label="New Password"
                placeholder="New Password"
              />
              <Button type="submit" isLoading={isSubmitting} colorScheme="teal">
                Change Password
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

ChangePasswordPage.getInitialProps = ({ query }) => {
  return {
    token: query.token as string
  }
}

export default withUrqlClient()(ChangePasswordPage)
