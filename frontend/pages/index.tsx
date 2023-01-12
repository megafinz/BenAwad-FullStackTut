import { Button, Flex, Heading, Link } from '@chakra-ui/react'
import { NextPage } from 'next'
import NextLink from 'next/link'
import { useQuery } from 'urql'
import Layout from '~/components/Layout'
import Loader from '~/components/Loader'
import PostList from '~/components/PostList'
import { AllPostsDoc } from '~/graphql/queries'
import { withUrqlClient } from '~/lib/urql'

const Home: NextPage = () => {
  const [{ data, fetching }] = useQuery({
    query: AllPostsDoc,
    variables: { limit: 10 }
  })
  return (
    <Layout>
      <Flex as="main" direction="column" gap={5}>
        <Flex>
          <Heading flexGrow={1}>Posts</Heading>
          <Button variant="link" color="teal">
            <NextLink href="/create-post" passHref legacyBehavior>
              <Link>Create New Post</Link>
            </NextLink>
          </Button>
        </Flex>
        {fetching && <Loader />}
        {!fetching && !data?.allPosts && <p>Can&apos;t load posts</p>}
        {!fetching && data?.allPosts && <PostList data={data?.allPosts} />}
      </Flex>
    </Layout>
  )
}

export default withUrqlClient({ ssr: true })(Home)
