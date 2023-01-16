import { useQuery } from '@apollo/client'
import { Button, Divider, Flex, Heading, Link } from '@chakra-ui/react'
import type {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPage
} from 'next'
import NextLink from 'next/link'
import Layout from '~/components/Layout'
import { PostList } from '~/components/PostList'
import { ME_QUERY, POSTS_QUERY } from '~/graphql/queries'
import { createClient, withApolloState } from '~/lib/apollo/server'

const Home: NextPage = () => {
  const { data } = useQuery(ME_QUERY)
  return (
    <Layout>
      <Flex as="main" direction="column" gap={5}>
        <Flex alignItems="baseline">
          <Heading flexGrow={1}>Posts</Heading>
          <Button variant="link" color="teal">
            <NextLink
              href={!!data?.me ? '/create-post' : '/login?next=/create-post'}
              passHref
              legacyBehavior
            >
              <Link fontSize="xl">+ New Post</Link>
            </NextLink>
          </Button>
        </Flex>
        <Divider />
        <PostList />
      </Flex>
    </Layout>
  )
}

export async function getServerSideProps({
  req
}: GetServerSidePropsContext): Promise<GetServerSidePropsResult<{}>> {
  const apolloClient = createClient({ cookies: req.cookies })
  await apolloClient.query({ query: ME_QUERY })
  await apolloClient.query({
    query: POSTS_QUERY,
    variables: { input: { limit: 10, cursor: null } }
  })
  return withApolloState(apolloClient, {
    props: {}
  })
}

export default Home
