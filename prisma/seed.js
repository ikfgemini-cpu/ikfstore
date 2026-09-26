const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const categoryCount = await prisma.category.count();
  if (categoryCount === 0) {
    await prisma.category.createMany({
      data: [
        { name: 'Mobile Games' },
        { name: 'PC Games' },
        { name: 'Vouchers' }
      ]
    });
    console.log('Created default categories');
  } else {
    console.log('Categories already exist');
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
