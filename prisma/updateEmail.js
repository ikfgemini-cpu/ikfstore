const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const oldEmail = 'admin@digistore.com';
  const newEmail = 'adminikf@ikfstore.com';
  
  const existingAdmin = await prisma.admin.findUnique({
    where: { email: oldEmail }
  });

  if (existingAdmin) {
    await prisma.admin.update({
      where: { email: oldEmail },
      data: { email: newEmail }
    });
    console.log(`Email admin berhasil diubah menjadi ${newEmail}`);
  } else {
    console.log(`Admin dengan email ${oldEmail} tidak ditemukan.`);
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
