import { INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';

const prisma = new PrismaClient();

export default async function setupAdmin(
  app: INestApplication,
  options: {
    port: string;
  },
) {
  const AdminJS = await import('adminjs');
  const AdminJSExpress = (await import('@adminjs/express')).default;
  const AdminJSPrisma = await import('@adminjs/prisma');
  const passwordsFeature = (await import('@adminjs/passwords')).default;
  const ComponentLoader = AdminJS.ComponentLoader;
  const componentLoader = new ComponentLoader();

  AdminJS.default.registerAdapter({
    Resource: AdminJSPrisma.Resource,
    Database: AdminJSPrisma.Database,
  });

  // Icons from https://feathericons.com/
  const adminOptions = {
    resources: [
      {
        resource: {
          client: prisma,
          model: AdminJSPrisma.getModelByName('User'),
        },
        features: [
          passwordsFeature({
            componentLoader,
            properties: { encryptedPassword: 'password' },
            hash: argon2.hash,
          }),
        ],
        options: {
          id: 'User',
          navigation: {
            name: 'Users',
            icon: 'User',
          },
        },
      },
    ],
    componentLoader,
  };
  const admin = new AdminJS.default(adminOptions);
  const adminRouter = AdminJSExpress.buildRouter(admin);
  app.use(admin.options.rootPath, adminRouter);

  return {
    successMessage: `AdminJS started on http://localhost:${options.port}${admin.options.rootPath}`,
  };
}
