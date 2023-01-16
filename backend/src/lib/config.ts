import { z } from 'zod'

const ConfigSchema = z.object({
  backend: z.object({
    hostname: z.string().default('::'),
    port: z.number().int().positive().default(4000)
  }),
  frontend: z.object({
    baseUrl: z.string().default('http://localhost:3000')
  }),
  db: z.object({
    redisSecret: z.string({
      required_error: 'REDIS_SECRET env var is required'
    })
  })
})

type Config = z.infer<typeof ConfigSchema>

const parsedConfig = ConfigSchema.safeParse({
  backend: {
    hostname: process.env.HOSTNAME,
    port: process.env.PORT
  },
  frontend: {
    baseUrl: process.env.WEB_APP_BASE_URL
  },
  db: {
    redisSecret: process.env.REDIS_SECRET
  }
})

let config: Config

if (parsedConfig.success) {
  config = parsedConfig.data
} else {
  console.error('Failed to initialize config', parsedConfig.error.toString())
  throw new Error('Failed to initialize config')
}

export default config
