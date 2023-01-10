import { Box, Button } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { NextPage } from 'next'
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
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          const result = await login({ input: values })
          if (result.error) {
            console.error(result.error)
          } else if (!result.data?.loginUser.user) {
            setErrors({
              username: 'Invalid username or password',
              password: 'Invalid username or password'
            })
          } else {
            router.push('/')
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
              <InputField
                name="password"
                label="Password"
                placeholder="Password"
                type="password"
              />
              <Button type="submit" isLoading={isSubmitting} colorScheme="teal">
                Login
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Layout>
  )
}

export default withUrqlClient()(LoginPage)
