import { Button, Flex, Link, Text } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useMutation, useQuery } from 'urql'
import { LogoutUserDoc } from '../graphql/mutations'
import { MeDoc } from '../graphql/queries'
import Loader from './Loader'

export default function NavBar() {
  const [{ data, fetching }] = useQuery({ query: MeDoc })
  const [{ fetching: loggingOut }, logout] = useMutation(LogoutUserDoc)
  return (
    <Flex
      as="nav"
      bg="tan"
      p="4"
      gap="10px"
      justifyContent="flex-end"
      alignItems="center"
    >
      {fetching && <Loader />}
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
          <Button
            variant="link"
            onClick={() => logout({})}
            isLoading={loggingOut}
          >
            Logout
          </Button>
        </>
      )}
    </Flex>
  )
}
