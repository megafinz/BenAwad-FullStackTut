import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  from,
  InMemoryCache
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'

const consoleLink = new ApolloLink((operation, forward) => {
  console.log(`[APOLLO] Starting request for '${operation.operationName}'`)
  console.dir(operation.getContext())
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
  }
})

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include'
})

const links: ApolloLink[] = []

if (process.env.NODE_ENV === 'development') {
  links.push(consoleLink, errorLink)
}

links.push(httpLink)

// TODO: URI from config
export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from(links)
})
