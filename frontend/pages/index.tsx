import { Button, Divider, Flex, Heading, Link } from '@chakra-ui/react'
import { NextPage } from 'next'
import NextLink from 'next/link'
import { useQuery } from 'urql'
import Layout from '~/components/Layout'
import { PostList } from '~/components/Posts'
import { MeDoc } from '~/graphql/queries'
import { withUrqlClient } from '~/lib/urql'

const Home: NextPage = () => {
  const [{ data }] = useQuery({ query: MeDoc })
  return (
    <Layout>
      <Flex as="main" direction="column" gap={5}>
        <Flex alignItems="baseline">
          <Heading flexGrow={1}>Blogistan</Heading>
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

// TODO: figure out SSR + authentication
export default withUrqlClient()(Home)
