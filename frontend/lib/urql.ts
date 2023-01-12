import { cacheExchange, Data } from '@urql/exchange-graphcache'
import {
  withUrqlClient as _withUrqlClient,
  WithUrqlClientOptions
} from 'next-urql'
import router from 'next/router'
import { dedupExchange, Exchange, fetchExchange } from 'urql'
import { pipe, tap } from 'wonka'

interface LoginUserResponse {
  user: Data
}

// TODO: this is not ideal as it happens AFTER the query is processed in the UI
const authErrorExchange: Exchange =
  ({ forward }) =>
  ops$ => {
    return pipe(
      forward(ops$),
      tap(({ error }) => {
        if (!error) {
          return
        }
        for (const gqlError of error.graphQLErrors) {
          if (gqlError.extensions?.code === 'UNAUTHENTICATED') {
            router.replace('/login')
          }
        }
      })
    )
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
        authErrorExchange,
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
