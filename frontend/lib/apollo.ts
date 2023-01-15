import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include'
})

// TODO: URI from config
// TODO: error link
export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: httpLink
})
