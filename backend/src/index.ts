import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import { ApolloServer, ExpressContext } from 'apollo-server-express'
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
import { retry } from './utils/retry'

declare module 'express-session' {
  interface SessionData {
    userId?: number
  }
}

type RedisClient = ReturnType<typeof createRedisClient>

async function initRedis(): Promise<RedisClient> {
  // TODO: find a better solution instead of legacy mode for enabling session storage
  const redisClient = createRedisClient({
    url: config.db.redis.url,
    legacyMode: true
  })
  try {
    await retry(async () => {
      await redisClient.connect()
    })
  } catch (error) {
    console.error('Failed to connect to Redis')
    throw error
  }
  return redisClient
}

// TODO: custom context type?
async function initApollo(
  redis: RedisClient
): Promise<ApolloServer<ExpressContext>> {
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, PostResolver, VoteResolver],
      validate: false
    }),
    context: ({ req, res }) => ({ req, res, redis }),
    plugins:
      config.node.env === 'development'
        ? [ApolloServerPluginLandingPageGraphQLPlayground()]
        : []
  })
  try {
    await retry(async () => {
      await apolloServer.start()
      return apolloServer
    })
  } catch (error) {
    console.error('Failed to initialize Apollo Server')
    throw error
  }
  return apolloServer
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

  console.log('Connecting to Redis...')
  const redisClient = await initRedis()
  console.log('Successfully connected to Redis')

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
      secret: config.db.redis.sessionSecret,
      saveUninitialized: false,
      resave: false
    })
  )

  // Apollo.
  console.log('Initializing Apollo Server...')
  const apolloServer = await initApollo(redisClient)
  console.log('Successfully initialized Apollo Server')

  apolloServer.applyMiddleware({ app, cors: false })

  // Misc.
  app.set('trust proxy', 1)

  // Start Server.
  app.listen(config.backend.port, config.backend.host, () => {
    console.log(
      `Server started on port HOST '${config.backend.host}' and PORT '${config.backend.port}'`
    )
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async error => {
    console.error('Failed to start backend server, shutting down...', error)
    await prisma.$disconnect()
    process.exit(1)
  })
