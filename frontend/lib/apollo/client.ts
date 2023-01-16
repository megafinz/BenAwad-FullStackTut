import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  from,
  InMemoryCache,
  NormalizedCacheObject
} from '@apollo/client'
import { useMemo } from 'react'
import { isServer } from '~/utils'
import { APOLLO_STATE_PROP_NAME, defaultLinks, mergeCache } from './shared'

// TODO: URI from config
const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include'
})

let clientInstance: ApolloClient<NormalizedCacheObject>

function initServerApollo(initialState?: NormalizedCacheObject) {
  const cache = new InMemoryCache()
  if (initialState) {
    cache.restore(initialState)
  }
  return new ApolloClient({
    cache,
    link: from([...defaultLinks, httpLink]),
    ssrMode: true
  })
}

function initClientApollo(initialState?: NormalizedCacheObject) {
  if (!clientInstance) {
    const cache = new InMemoryCache()
    if (initialState) {
      cache.restore(initialState)
    }
    clientInstance = new ApolloClient({
      cache,
      link: from([...defaultLinks, httpLink])
    })
    return clientInstance
  }
  if (initialState) {
    const existingCache = clientInstance.cache.extract()
    const mergedCache = mergeCache(existingCache, initialState)
    clientInstance.cache.restore(mergedCache)
  }
  return clientInstance
}

function initApollo(initialState?: NormalizedCacheObject) {
  return isServer()
    ? initServerApollo(initialState)
    : initClientApollo(initialState)
}

export function useApollo(pageProps: any) {
  const state = pageProps[APOLLO_STATE_PROP_NAME]
  return useMemo(() => initApollo(state), [state])
}
