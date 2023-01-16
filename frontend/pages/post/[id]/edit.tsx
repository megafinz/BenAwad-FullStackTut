import { useMutation, useQuery } from '@apollo/client'
import { Box, Button, Divider, Flex, Heading } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPage
} from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import InputField from '~/components/InputField'
import Layout from '~/components/Layout'
import Loader from '~/components/Loader'
import TextAreaField from '~/components/TextAreaField'
import { UPDATE_POST_MUT } from '~/graphql/mutations/update-post'
import { ME_QUERY, POSTS_QUERY, POST_QUERY } from '~/graphql/queries'
import { toErrorMap } from '~/utils'

interface Props {
  id: number
}

// TODO: SSR
// TODO: display gql errors properly
// TODO: optimistic cache updates
const EditPostPage: NextPage<Props> = ({ id }) => {
  const router = useRouter()
  const { data: meData, loading: meLoading } = useQuery(ME_QUERY)
  const { data: postData, loading: postLoading } = useQuery(POST_QUERY, {
    variables: { id }
  })
  const [updatePost] = useMutation(UPDATE_POST_MUT, {
    refetchQueries: [POSTS_QUERY, { query: POST_QUERY, variables: { id } }]
  })
  const loading = meLoading || postLoading
  const canEdit = postData?.post?.author.id === meData?.me?.id
  useEffect(() => {
    if (!loading && !postData?.post) {
      router.replace('/404', router.asPath)
    } else if (!loading && !canEdit) {
      router.replace('/403', router.asPath)
    }
  }, [loading, canEdit, postData, router])
  return (
    <Layout title="Edit Post">
      <Heading>Edit Post</Heading>
      <Divider />
      {loading && <Loader />}
      {!loading && canEdit && postData?.post && (
        <Formik
          initialValues={{
            id: postData.post.id,
            title: postData.post.title,
            text: postData.post.text
          }}
          onReset={() => {
            router.push(`/post/${id}`)
          }}
          onSubmit={async (values, { setErrors }) => {
            const { data, errors } = await updatePost({
              variables: { input: values }
            })
            if (data?.updatePost?.post?.id) {
              router.push(`/post/${data.updatePost.post.id}`)
            } else if (data?.updatePost?.errors) {
              const fieldErrors = data.updatePost.errors.filter(x => !!x.field)
              if (fieldErrors) {
                setErrors(toErrorMap(fieldErrors))
              }
            } else if (errors) {
              console.error(
                '❗ Something went wrong while attempting to update the Post',
                errors
              )
              alert(
                '❗ Something went wrong while attempting to update the Post'
              )
            } else {
              alert(
                '❗ Something went wrong while attempting to update the Post'
              )
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
                    Save Changes
                  </Button>
                </Flex>
              </Box>
            </Form>
          )}
        </Formik>
      )}
    </Layout>
  )
}

// TODO: SSR
export async function getServerSideProps({
  params
}: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Props>> {
  const id = parseInt(typeof params?.id === 'string' ? params.id : '')
  if (!id) {
    return {
      notFound: true
    }
  }
  return {
    props: {
      id
    }
  }
}

export default EditPostPage
