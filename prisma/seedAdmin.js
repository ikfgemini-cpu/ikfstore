const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  const email = 'adminikf@ikfstore.com';
  
  const existingAdmin = await prisma.admin.findUnique({
    where: { email }
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await prisma.admin.create({
      data: {
        email,
        password: hashedPassword
      }
    });
    console.log(`Admin default (email: ${email}, password: admin123) berhasil dibuat!`);
  } else {
    console.log(`Admin ${email} sudah ada.`);
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
