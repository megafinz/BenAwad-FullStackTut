import { Heading, Text } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Layout from '~/components/Layout'

const UnauthorizedPage: NextPage = () => {
  return (
    <Layout title="403">
      <Heading fontSize="3xl">403 | Forbidden</Heading>
      <Text>Sorry, you&apos; not authorized to perform this action</Text>
    </Layout>
  )
}

export default UnauthorizedPage
