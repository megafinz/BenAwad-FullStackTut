import { cacheExchange, Data } from '@urql/exchange-graphcache'
import {
  withUrqlClient as _withUrqlClient,
  WithUrqlClientOptions
} from 'next-urql'
import router from 'next/router'
import { dedupExchange, Exchange, fetchExchange } from 'urql'
import { pipe, tap } from 'wonka'
import { PostsDoc } from '~/graphql/queries'
import {
  UnvoteInput,
  VoteInput,
  VoteResponse
} from '~/graphql/_generated/graphql'

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
          keys: {
            PostsResponse: () => null,
            PaginationInfo: () => null,
            PostVote: () => null
          },
          updates: {
            Mutation: {
              loginUser: (result, _, cache) => {
                const loginUserResponse = result.loginUser as LoginUserResponse
                if (loginUserResponse?.user) {
                  cache.link('Query', 'me', loginUserResponse.user)
                }
              },
              logoutUser: (result, _, cache) => {
                if (!!result.logoutUser) {
                  cache.link('Query', 'me', null)
                }
              },
              createPost: (_, __, cache) => {
                cache.updateQuery({ query: PostsDoc }, () => null)
              },
              vote: (result, args, cache) => {
                const voteResponse = result.vote as VoteResponse
                const voteArgs = args as { input: VoteInput }
                if (!voteResponse?.success || !voteArgs) {
                  return
                }
                // TODO: finer grained update
                cache.invalidate({
                  __typename: 'Post',
                  id: voteArgs.input.postId
                })
              },
              unvote: (result, args, cache) => {
                const unvoteResponse = result.unvote as VoteResponse
                const voteArgs = args as { input: UnvoteInput }
                if (!unvoteResponse?.success || !voteArgs) {
                  return
                }
                // TODO: finer grained update
                cache.invalidate({
                  __typename: 'Post',
                  id: voteArgs.input.postId
                })
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
