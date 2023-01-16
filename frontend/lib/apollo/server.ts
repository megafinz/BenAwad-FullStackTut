import {
  ApolloClient,
  createHttpLink,
  from,
  InMemoryCache,
  NormalizedCacheObject
} from '@apollo/client'
import config from '~/lib/config'
import { APOLLO_STATE_PROP_NAME, defaultLinks } from './shared'

export function withApolloState(
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: any
) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract()
  }
  return pageProps
}

interface Options {
  cookies: Partial<{ [key: string]: string }>
}

export function createClient({ cookies }: Options) {
  const cookie = Object.entries(cookies)
    .map(([k, v]) => `${k}=${v}`)
    .join('; ')
  const httpLink = createHttpLink({
    uri: config.backend.gqlUrl,
    credentials: 'include',
    headers: {
      cookie
    }
  })
  return new ApolloClient({
    ssrMode: true,
    cache: new InMemoryCache(),
    link: from([...defaultLinks, httpLink])
  })
}
