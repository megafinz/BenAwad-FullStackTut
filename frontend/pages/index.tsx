import { Button, Divider, Flex, Heading, Link } from '@chakra-ui/react'
import { NextPage } from 'next'
import NextLink from 'next/link'
import Layout from '~/components/Layout'
import PostList from '~/components/PostList'
import { withUrqlClient } from '~/lib/urql'

const Home: NextPage = () => {
  return (
    <Layout>
      <Flex as="main" direction="column" gap={5}>
        <Flex>
          <Heading flexGrow={1}>Blogistan</Heading>
          <Button variant="link" color="teal">
            <NextLink href="/create-post" passHref legacyBehavior>
              <Link>+ New Post</Link>
            </NextLink>
          </Button>
        </Flex>
        <Divider />
        <PostList />
      </Flex>
    </Layout>
  )
}

export default withUrqlClient({ ssr: true })(Home)
