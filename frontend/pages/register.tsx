import { NextPage } from 'next'
import { Form, Formik } from 'formik'
import { Box, Button } from '@chakra-ui/react'
import InputField from '../components/InputField'

const RegisterPage: NextPage = () => {
  // TODO: layout
  return (
    <Box as="main" mx="auto" width="400px" p="50px">
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={values => {
          console.log(values)
        }}
      >
        {({ values, handleChange, isSubmitting }) => (
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
    </Box>
  )
}

export default RegisterPage
