import {
  ApolloClient,
  createHttpLink,
  from,
  InMemoryCache,
  NormalizedCacheObject
} from '@apollo/client'
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
  // TODO: URI from config
  const httpLink = createHttpLink({
    uri: 'http://localhost:4000/graphql',
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
