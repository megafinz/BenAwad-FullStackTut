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
import { Post } from '~/graphql/_generated/graphql'
import { createClient, withApolloState } from '~/lib/apollo/server'
import { toErrorMap } from '~/utils'

interface Props {
  data: Post
}

// TODO: display gql errors properly
// TODO: optimistic cache updates
const EditPostPage: NextPage<Props> = ({ data }) => {
  const router = useRouter()
  const { data: meData, loading } = useQuery(ME_QUERY)
  const [updatePost] = useMutation(UPDATE_POST_MUT, {
    refetchQueries: [
      POSTS_QUERY,
      { query: POST_QUERY, variables: { id: data.id } }
    ]
  })
  const canEdit = data.author.id === meData?.me?.id
  useEffect(() => {
    if (!loading && !canEdit) {
      router.replace('/403', router.asPath)
    }
  }, [loading, canEdit, router])
  return (
    <Layout title="Edit Post">
      <Heading>Edit Post</Heading>
      <Divider />
      {loading && <Loader />}
      {!loading && canEdit && (
        <Formik
          initialValues={{
            id: data.id,
            title: data.title,
            text: data.text
          }}
          onReset={() => {
            router.push(`/post/${data.id}`)
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

export async function getServerSideProps({
  req,
  params
}: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Props>> {
  const apolloClient = createClient({ cookies: req.cookies })
  const id = parseInt(typeof params?.id === 'string' ? params.id : '')
  if (!id) {
    return {
      notFound: true
    }
  }
  await apolloClient.query({ query: ME_QUERY })
  const { data } = await apolloClient.query({
    query: POST_QUERY,
    variables: { id }
  })
  if (!data.post) {
    return {
      notFound: true
    }
  }
  return withApolloState(apolloClient, {
    props: {
      data: data.post
    }
  })
}

export default EditPostPage
