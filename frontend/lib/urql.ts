import { createClient, dedupExchange, fetchExchange } from 'urql'
import { cacheExchange, Data } from '@urql/exchange-graphcache'

interface LoginUserResponse {
  user: Data
}

export const urqlClient = createClient({
  // TODO: read from config/env vars
  url: 'http://localhost:4000/graphql',
  fetchOptions: {
    credentials: 'include'
  },
  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
          loginUser: (result, _, cache, __) => {
            const loginUserResponse = result.loginUser as LoginUserResponse
            if (loginUserResponse?.user) {
              cache.link('Query', 'me', loginUserResponse.user)
            }
          }
        }
      }
    }),
    fetchExchange
  ]
})
