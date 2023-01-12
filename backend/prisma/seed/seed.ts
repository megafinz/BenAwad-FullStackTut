import { Prisma, PrismaClient } from '@prisma/client'

import users from './users.json'
import posts from './posts.json'

const prisma = new PrismaClient()

async function main() {
  await prisma.user.deleteMany()
  console.log('🚽 Deleted all Users')
  await prisma.post.deleteMany()
  console.log('🚽 Deleted all Posts')
  await prisma.user.createMany({
    data: users.map(x => x as Prisma.UserCreateManyInput)
  })
  console.log('🌱 Created seed Users')
  await prisma.post.createMany({
    data: posts.map(x => x as Prisma.PostCreateManyInput)
  })
  console.log('🌱 Created seed Posts')
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async error => {
    console.error('Failed to seed the database', error)
    await prisma.$disconnect()
    process.exit(1)
  })
