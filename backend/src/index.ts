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
import { PostResolver, UserResolver } from './gql/resolvers'
import prisma from './prisma'

declare module 'express-session' {
  interface SessionData {
    userId?: number
  }
}

const REDIS_SECRET = process.env.REDIS_SECRET

const main = async () => {
  if (!REDIS_SECRET) {
    throw new Error('REDIS_SECRET env var is not set')
  }

  const port = parseInt(process.env.PORT || '4000')
  const app = express().disable('x-powered-by')

  // CORS.
  // TODO: read from config
  app.use(
    cors({
      origin: 'http://localhost:3000',
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
      secret: REDIS_SECRET,
      saveUninitialized: false,
      resave: false
    })
  )

  // Apollo.
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, PostResolver],
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

  // Start Server.
  app.listen(port, () => {
    console.log(`Server started on port ${port}`)
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
