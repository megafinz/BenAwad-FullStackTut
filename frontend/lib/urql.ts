import { dedupExchange, fetchExchange } from 'urql'
import { cacheExchange, Data } from '@urql/exchange-graphcache'
import {
  withUrqlClient as _withUrqlClient,
  WithUrqlClientOptions
} from 'next-urql'

interface LoginUserResponse {
  user: Data
}

export const withUrqlClient = (options?: WithUrqlClientOptions) =>
  _withUrqlClient(
    ssrExchange => ({
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
              },
              logoutUser: (result, _, cache, __) => {
                if (!!result.logoutUser) {
                  cache.link('Query', 'me', null)
                }
              }
            }
          }
        }),
        ssrExchange,
        fetchExchange
      ]
    }),
    options
  )
