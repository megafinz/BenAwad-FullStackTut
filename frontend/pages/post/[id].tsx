import { useQuery } from '@apollo/client'
import { Divider, Flex, Grid, GridItem, Heading, Text } from '@chakra-ui/react'
import type {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPage
} from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Layout from '~/components/Layout'
import Loader from '~/components/Loader'
import { Vote } from '~/components/Vote'
import { POST_QUERY } from '~/graphql/queries'

interface Props {
  id: number
}

// TODO: SSR
const PostPage: NextPage<Props> = ({ id }) => {
  const router = useRouter()
  const { data, loading } = useQuery(POST_QUERY, {
    variables: { id }
  })
  useEffect(() => {
    if (!loading && !data?.post) {
      router.replace('/404')
    }
  }, [loading, data, router])
  return (
    <Layout title="Post">
      <>
        {loading && <Loader />}
        {!loading && data?.post && (
          <Grid templateColumns="auto 1fr" gap={5}>
            <GridItem>
              <Vote data={data.post} />
            </GridItem>
            <GridItem>
              <Flex flexDir="column" gap={5}>
                <Flex alignItems="center">
                  <Heading flexGrow={1}>{data.post.title}</Heading>
                  <Text color="gray">by {data.post.author.username}</Text>
                </Flex>
                <Divider />
                <Text>{data.post.text}</Text>
              </Flex>
            </GridItem>
          </Grid>
        )}
      </>
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

export default PostPage
