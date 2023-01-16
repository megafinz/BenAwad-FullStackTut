import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import { ApolloServer } from 'apollo-server-express'
import redisConnector from 'connect-redis'
import cors from 'cors'
import express from 'express'
import session from 'express-session'
import { createClient as createRedisClient } from 'redis'
import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import { COOKIE_NAME, __prod__ } from './constants'
import { PostResolver, UserResolver, VoteResolver } from './gql/resolvers'
import config from './lib/config'
import prisma from './prisma'

declare module 'express-session' {
  interface SessionData {
    userId?: number
  }
}

const main = async () => {
  const app = express().disable('x-powered-by')

  // CORS.
  app.use(
    cors({
      origin: config.frontend.baseUrl,
      credentials: true
    })
  )

  // Redis Session.
  const RedisStore = redisConnector(session)
  // TODO: find a better solution instead of legacy mode for enabling session storage
  const redisClient = createRedisClient({ legacyMode: true })

  try {
    await redisClient.connect()
  } catch (error) {
    console.error('Failed to initialize Redis connection')
    throw error
  }

  app.use(
    session({
      // TODO: redis client type
      store: new RedisStore({
        client: redisClient as any,
        disableTouch: true
      }),
      name: COOKIE_NAME,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: 'lax',
        secure: __prod__ // only in https
      },
      secret: config.db.redisSecret,
      saveUninitialized: false,
      resave: false
    })
  )

  // Apollo.
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, PostResolver, VoteResolver],
      validate: false
    }),
    context: ({ req, res }) => ({ req, res, redis: redisClient }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()]
  })

  try {
    await apolloServer.start()
  } catch (error) {
    console.error('Failed to initialize Apollo Server')
    throw error
  }

  apolloServer.applyMiddleware({ app, cors: false })

  app.set('trust proxy', 1)

  // Start Server.
  app.listen(config.backend.port, config.backend.hostname, () => {
    console.log(
      `Server started on port HOST '${config.backend.hostname}' and PORT '${config.backend.port}'`
    )
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async error => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
