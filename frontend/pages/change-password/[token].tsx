import { useMutation } from '@apollo/client'
import { Box, Button, Divider } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { NextPage } from 'next'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import InputField from '~/components/InputField'
import Layout from '~/components/Layout'
import { CHANGE_PASSWORD_MUT } from '~/graphql/mutations'
import { toErrorMap } from '~/utils'

// TODO: display gql errors properly
const ChangePasswordPage: NextPage = () => {
  const router = useRouter()
  const [changePassword] = useMutation(CHANGE_PASSWORD_MUT)
  return (
    <Layout variant="small" title="Change Password">
      <Formik
        initialValues={{
          newPassword: '',
          token:
            typeof router.query.token === 'string' ? router.query.token : ''
        }}
        onSubmit={async (values, { setErrors }) => {
          const result = await changePassword({ variables: { ...values } })
          if (result.data?.changePassword.success) {
            alert('✅ Password has been changed successfully')
            router.push('/login')
          } else if (result.data?.changePassword.errors) {
            setErrors(toErrorMap(result.data.changePassword.errors))
          } else if (result.errors) {
            console.error(
              '❗ Something went wrong while attempting to change password',
              result.errors
            )
            alert('❗ Something went wrong while attempting to change password')
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

export default ChangePasswordPage
