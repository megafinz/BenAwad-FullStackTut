import { ExpressContext } from 'apollo-server-express'
import { GraphQLError } from 'graphql'
import { MiddlewareFn } from 'type-graphql'

export const auth: MiddlewareFn<ExpressContext> = ({ context }, next) => {
  if (!context.req.session?.userId) {
    throw new GraphQLError('User is not authenticated', {
      extensions: {
        code: 'UNAUTHENTICATED',
        http: { status: 401 }
      }
    })
  }
  return next()
}
