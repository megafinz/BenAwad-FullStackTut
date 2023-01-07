import 'reflect-metadata'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { __prod__ } from './constants'
import prisma from './prisma'
import { PostResolver, UserResolver } from './gql/resolvers'

const main = async () => {
  const port = parseInt(process.env.PORT || '4000')
  const app = express()
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, PostResolver],
      validate: false
    })
  })
  await apolloServer.start()
  apolloServer.applyMiddleware({ app })
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
