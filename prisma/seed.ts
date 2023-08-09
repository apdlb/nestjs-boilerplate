import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { email: 'admin@z1.digital' },
    update: {},
    create: {
      role: 'ADMIN',
      email: 'admin@z1.digital',
      password: '59tpZv46NUn9b7fn6WXxBCilZhTfuO',
      firstName: 'Admin',
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
