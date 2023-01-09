import { Button, Flex, Link, Text } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useMeQuery } from '../graphql/generated/graphql'

export default function NavBar() {
  const [{ data, fetching }] = useMeQuery()
  return (
    <Flex as="nav" bg="tomato" p="4" gap="10px" justifyContent="flex-end">
      {fetching && <Text>Loading…</Text>}
      {!fetching && !data?.me?.id && (
        <>
          <Text>
            <NextLink href="/login" passHref>
              <Link>Login</Link>
            </NextLink>
          </Text>
          <Text>
            <NextLink href="/register" passHref>
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
