import { z } from 'zod'

const ConfigSchema = z.object({
  node: z.object({
    env: z.string().default('development')
  }),
  backend: z.object({
    host: z.string().default('::'),
    port: z.preprocess(
      x => parseInt((x as string) || '4000'),
      z
        .number({ required_error: 'PORT must be a number' })
        .int()
        .positive()
        .default(4000)
    )
  }),
  frontend: z.object({
    baseUrl: z.string().default('http://localhost:3000')
  }),
  db: z.object({
    redis: z.object({
      url: z.string().default('redis://127.0.0.1:6379'),
      sessionSecret: z.string({
        required_error: 'REDIS_SECRET env var is required'
      })
    })
  })
})

type Config = z.infer<typeof ConfigSchema>

const parsedConfig = ConfigSchema.safeParse({
  node: {
    env: process.env.NODE_ENV
  },
  backend: {
    host: process.env.HOST,
    port: process.env.PORT
  },
  frontend: {
    baseUrl: process.env.WEB_APP_BASE_URL
  },
  db: {
    redis: {
      url: process.env.REDIS_URL,
      sessionSecret: process.env.REDIS_SECRET
    }
  }
})

let config: Config

if (parsedConfig.success) {
  config = parsedConfig.data
} else {
  throw new Error(
    `Failed to initialize config: ${parsedConfig.error.toString()}`
  )
}

export default config
