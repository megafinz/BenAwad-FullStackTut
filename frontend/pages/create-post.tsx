import { useMutation } from '@apollo/client'
import { Box, Button, Divider, Flex, Heading } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import type { NextPage } from 'next'
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
    <Layout title="New Post">
      <Heading>New Post</Heading>
      <Divider />
      <Formik
        initialValues={{ title: '', text: '' }}
        onReset={() => {
          router.push('/')
        }}
        onSubmit={async (values, { setErrors }) => {
          const { data, errors } = await createPost({
            variables: { input: values }
          })
          if (data?.createPost?.post?.id) {
            router.push(`/post/${data.createPost.post.id}`)
          } else if (data?.createPost?.errors) {
            const fieldErrors = data.createPost.errors.filter(x => !!x.field)
            if (fieldErrors) {
              setErrors(toErrorMap(fieldErrors))
            }
          } else if (errors) {
            console.error(
              '❗ Something went wrong while attempting to create a Post',
              errors
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
              <Flex justifyContent="right" gap={3}>
                <Button type="reset" isLoading={isSubmitting}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  colorScheme="teal"
                >
                  Create Post
                </Button>
              </Flex>
            </Box>
          </Form>
        )}
      </Formik>
    </Layout>
  )
}

export default CreatePostPage
