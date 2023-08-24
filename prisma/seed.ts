import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';

const prisma = new PrismaClient();

async function main() {
  const adminHashedPassword = await argon2.hash(
    '59tpZv46NUn9b7fn6WXxBCilZhTfuO',
  );

  await prisma.user.upsert({
    where: { email: 'admin@z1.digital' },
    update: {},
    create: {
      role: 'ADMIN',
      email: 'admin@z1.digital',
      password: adminHashedPassword,
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
