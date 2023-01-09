import { Button, Flex, Link, Text } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useQuery } from 'urql'
import { MeDoc } from '../graphql/queries'

export default function NavBar() {
  const [{ data, fetching }] = useQuery({ query: MeDoc })
  return (
    <Flex as="nav" bg="tan" p="4" gap="10px" justifyContent="flex-end">
      {fetching && <Text>Loading…</Text>}
      {!fetching && !data?.me?.username && (
        <>
          <Text>
            <NextLink href="/login" passHref legacyBehavior>
              <Link>Login</Link>
            </NextLink>
          </Text>
          <Text>
            <NextLink href="/register" passHref legacyBehavior>
              <Link>Register</Link>
            </NextLink>
          </Text>
        </>
      )}
      {!fetching && !!data?.me?.id && (
        <>
          <Text>{data.me.username}</Text>
          <Button variant="link">Logout</Button>
        </>
      )}
    </Flex>
  )
}
