import { ApolloLink, NormalizedCacheObject } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import merge from 'deepmerge'

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__'

const consoleLink = new ApolloLink((operation, forward) => {
  console.log(`[APOLLO] Starting request for '${operation.operationName}'`)
  return forward(operation).map(data => {
    console.log(`[APOLLO] Ending request for '${operation.operationName}'`)
    return data
  })
})

const errorLink = onError(({ graphQLErrors: graphqlErrors, networkError }) => {
  for (const { message, locations, path } of graphqlErrors || []) {
    console.log(
      `[APOLLO][GQL ERROR]: Message: ${message}, Location: ${locations}, Path: ${path}`
    )
  }
  if (networkError) {
    console.log(`[APOLLO][NET ERROR]: ${networkError}`)
    console.dir(networkError, { depth: 10 })
  }
})

export const defaultLinks: ApolloLink[] =
  process.env.NODE_ENV === 'development' ? [consoleLink, errorLink] : []

export function mergeCache(
  a: NormalizedCacheObject,
  b: NormalizedCacheObject
): NormalizedCacheObject {
  return merge(a, b, {
    // combine arrays using object equality (like in sets)
    arrayMerge: (destinationArray, sourceArray) => [
      ...sourceArray,
      ...destinationArray.filter(d => sourceArray.every(s => d === s))
    ]
  })
}
