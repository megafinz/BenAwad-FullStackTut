import { useMutation, useQuery } from '@apollo/client'
import { Button, Flex, Link, Spacer, Text, Tooltip } from '@chakra-ui/react'
import NextLink from 'next/link'
import { LOGOUT_USER_MUT } from '~/graphql/mutations'
import { ME_QUERY, POSTS_QUERY } from '~/graphql/queries'
import Loader from './Loader'

function NavLink({ title, url }: { title: string; url: string }) {
  return (
    <Text textTransform="lowercase">
      <NextLink href={url} passHref legacyBehavior>
        <Link>{title}</Link>
      </NextLink>
    </Text>
  )
}

export default function NavBar() {
  const { data, loading } = useQuery(ME_QUERY)
  const [logout, { loading: loggingOut }] = useMutation(LOGOUT_USER_MUT, {
    refetchQueries: [ME_QUERY, POSTS_QUERY]
  })
  return (
    <Flex as="nav" bg="tan" p="4" gap="10px" alignItems="center">
      <Tooltip label="Home" openDelay={1000}>
        <NextLink href="/">⚫️</NextLink>
      </Tooltip>
      <Spacer />
      {loading && <Loader variant="light" />}
      {!loading && !data?.me?.username && (
        <>
          <NavLink title="Login" url="/login" />
          <NavLink title="Register" url="/register" />
        </>
      )}
      {!loading && !!data?.me?.id && (
        <>
          <Text>{data.me.username}</Text>
          <Button
            textTransform="lowercase"
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
