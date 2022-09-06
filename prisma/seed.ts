import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function products() {
  const gomasava = await prisma.products.create({
    data: {
      name: '胡麻鯖セット',
      price: 5000,
    },
  })

  const mentaiko = await prisma.products.create({
    data: {
      name: '明太子詰め合わせ',
      price: 6000,
    },
  })

  const beef = await prisma.products.create({
    data: {
      name: '焼肉盛り合わせ',
      price: 8000,
    },
  })

  console.log(gomasava, mentaiko, beef)
}

products()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
