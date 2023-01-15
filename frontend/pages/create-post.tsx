import { useMutation } from '@apollo/client'
import { Box, Button, Divider, Heading } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import InputField from '~/components/InputField'
import Layout from '~/components/Layout'
import TextAreaField from '~/components/TextAreaField'
import { CREATE_POST_MUT } from '~/graphql/mutations'
import { POSTS_QUERY } from '~/graphql/queries'
import { toErrorMap, useRequireAuth } from '~/utils'

// TODO: display gql errors properly
// TODO: optimistic cache updates
const CreatePostPage: NextPage = () => {
  useRequireAuth()
  const router = useRouter()
  const [createPost] = useMutation(CREATE_POST_MUT, {
    refetchQueries: [POSTS_QUERY]
  })
  return (
    <Layout title="New Post" variant="small">
      <Heading>New Post</Heading>
      <Divider />
      <Formik
        initialValues={{ title: '', text: '' }}
        onSubmit={async (values, { setErrors }) => {
          const result = await createPost({ variables: { input: values } })
          if (result.data?.createPost?.post?.id) {
            // TODO: navigate to post
            router.push('/')
          } else if (result.data?.createPost?.errors) {
            const fieldErrors = result.data.createPost.errors.filter(
              e => !!e.field
            )
            if (fieldErrors) {
              setErrors(toErrorMap(fieldErrors))
            }
          } else if (result.errors) {
            console.error(
              '❗ Something went wrong while attempting to create a Post',
              result.errors
            )
            alert('❗ Something went wrong while attempting to create a Post')
          } else {
            alert('❗ Something went wrong while attempting to create a Post')
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box sx={{ display: 'flex', flexDir: 'column', gap: '20px' }}>
              <InputField name="title" label="Title" placeholder="Title" />
              <TextAreaField name="text" label="Text" placeholder="Text" />
              <Button type="submit" isLoading={isSubmitting} colorScheme="teal">
                Create Post
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Layout>
  )
}

export default CreatePostPage
