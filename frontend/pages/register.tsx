import { Box, Button, Divider, Heading } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { NextPage } from 'next'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useMutation } from 'urql'
import InputField from '~/components/InputField'
import Layout from '~/components/Layout'
import { RegisterUserDoc } from '~/graphql/mutations'
import { withUrqlClient } from '~/lib/urql'
import { toErrorMap } from '~/utils'

const RegisterPage: NextPage = () => {
  const router = useRouter()
  const [_, register] = useMutation(RegisterUserDoc)
  return (
    <Layout variant="small" title="Register">
      <Heading>Register</Heading>
      <Divider />
      <Formik
        initialValues={{ username: '', email: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          const result = await register({ input: values })
          if (result.data?.registerUser.errors) {
            setErrors(toErrorMap(result.data.registerUser.errors))
          } else if (result.data?.registerUser.user) {
            router.push('/login')
          } else if (result.error) {
            console.error(result.error)
          } else {
            console.error(
              'Something went wrong during user registration process'
            )
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box sx={{ display: 'flex', flexDir: 'column', gap: '20px' }}>
              <InputField
                name="username"
                label="Username"
                placeholder="Username"
              />
              <InputField name="email" label="Email" placeholder="Email" />
              <InputField
                name="password"
                label="Password"
                placeholder="Password"
                type="password"
              />
              <Button type="submit" isLoading={isSubmitting} colorScheme="teal">
                Register
              </Button>
              <Divider />
              <Button colorScheme="teal" variant="link">
                <NextLink href="/login">Login</NextLink>
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Layout>
  )
}

export default withUrqlClient()(RegisterPage)
