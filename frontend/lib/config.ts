import { z } from 'zod'

const ConfigSchema = z.object({
  backend: z.object({
    gqlUrl: z.string().default('http://localhost:4000/graphql')
  })
})

const config = ConfigSchema.parse({
  backend: {
    gqlUrl: process.env.BACKEND_GRAPHQL_URL
  }
})

export default config
