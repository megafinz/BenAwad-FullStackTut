import { Box, Button, Divider, Heading } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { NextPage } from 'next'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useMutation } from 'urql'
import InputField from '~/components/InputField'
import Layout from '~/components/Layout'
import { LoginUserDoc } from '~/graphql/mutations'
import { withUrqlClient } from '~/lib/urql'

const LoginPage: NextPage = () => {
  const router = useRouter()
  const [_, login] = useMutation(LoginUserDoc)
  return (
    <Layout variant="small" title="Login">
      <Heading>Login</Heading>
      <Divider />
      <Formik
        initialValues={{ usernameOrEmail: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          const result = await login(values)
          if (result.error) {
            console.error(result.error)
          } else if (!result.data?.loginUser.user) {
            setErrors({
              usernameOrEmail: 'Invalid username or password',
              password: 'Invalid username or password'
            })
          } else {
            router.push(
              typeof router.query.next === 'string' ? router.query.next : '/'
            )
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box sx={{ display: 'flex', flexDir: 'column', gap: '20px' }}>
              <InputField
                name="usernameOrEmail"
                label="Username or Email"
                placeholder="Username or Email"
              />
              <InputField
                name="password"
                label="Password"
                placeholder="Password"
                type="password"
              />
              <Button type="submit" isLoading={isSubmitting} colorScheme="teal">
                Login
              </Button>
              <Divider />
              <Button colorScheme="teal" variant="link">
                <NextLink href="/register">Register</NextLink>
              </Button>
              <Button colorScheme="teal" variant="link">
                <NextLink href="/forgot-password">Forgot Password</NextLink>
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Layout>
  )
}

export default withUrqlClient()(LoginPage)
