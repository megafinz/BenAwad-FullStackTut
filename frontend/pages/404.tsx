import { Heading, Text } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Layout from '~/components/Layout'

const NotFoundPage: NextPage = () => {
  return (
    <Layout title="404">
      <Heading fontSize="3xl">404 | Not Found</Heading>
      <Text>Sorry, we couldn&apos;t find the page you were looking for</Text>
    </Layout>
  )
}

export default NotFoundPage
