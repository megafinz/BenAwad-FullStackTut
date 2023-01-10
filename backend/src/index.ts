import 'reflect-metadata'
import express from 'express'
import session from 'express-session'
import cors from 'cors'
import { createClient as createRedisClient } from 'redis'
import redisConnector from 'connect-redis'
import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import { buildSchema } from 'type-graphql'
import { COOKIE_NAME, __prod__ } from './constants'
import prisma from './prisma'
import { PostResolver, UserResolver } from './gql/resolvers'

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
  // TODO: find a better solution to session storage
  const redisClient = createRedisClient({ legacyMode: true })

  await redisClient.connect().catch(console.error)

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
    context: ({ req, res }) => ({ req, res, redisClient }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()]
  })

  await apolloServer.start()

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
