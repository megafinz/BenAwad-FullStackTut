import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Form, Formik } from 'formik'
import { Box, Button } from '@chakra-ui/react'
import { useRegisterUserMutation } from '../graphql/generated/graphql'
import InputField from '../components/InputField'
import Layout from '../components/Layout'
import { toErrorMap } from '../utils/to-error-map'

const RegisterPage: NextPage = () => {
  const router = useRouter()
  const [_, register] = useRegisterUserMutation()
  return (
    <Layout variant="small">
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          const result = await register({ input: values })
          if (result.data?.registerUser.errors) {
            setErrors(toErrorMap(result.data.registerUser.errors))
          } else if (result.data?.registerUser.user) {
            router.push('/')
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
              <InputField
                name="password"
                label="Password"
                placeholder="Password"
                type="password"
              />
              <Button type="submit" isLoading={isSubmitting} colorScheme="teal">
                Register
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Layout>
  )
}

export default RegisterPage
