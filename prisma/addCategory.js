const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const categoryName = 'Jual Akun';
  
  const existingCategory = await prisma.category.findFirst({
    where: { name: categoryName }
  });

  if (!existingCategory) {
    await prisma.category.create({
      data: { name: categoryName }
    });
    console.log(`Kategori "${categoryName}" berhasil ditambahkan!`);
  } else {
    console.log(`Kategori "${categoryName}" sudah ada.`);
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
