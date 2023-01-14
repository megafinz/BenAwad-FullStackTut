import { Button, Flex, Link, Spacer, Text, Tooltip } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useMutation, useQuery } from 'urql'
import { LogoutUserDoc } from '~/graphql/mutations'
import { MeDoc } from '~/graphql/queries'
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
  const [{ data, fetching }] = useQuery({ query: MeDoc })
  const [{ fetching: loggingOut }, logout] = useMutation(LogoutUserDoc)
  return (
    <Flex as="nav" bg="tan" p="4" gap="10px" alignItems="center">
      <Tooltip label="Home" openDelay={1000}>
        <NextLink href="/">⚫️</NextLink>
      </Tooltip>
      <Spacer />
      {fetching && <Loader variant="light" />}
      {!fetching && !data?.me?.username && (
        <>
          <NavLink title="Login" url="/login" />
          <NavLink title="Register" url="/register" />
        </>
      )}
      {!fetching && !!data?.me?.id && (
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
