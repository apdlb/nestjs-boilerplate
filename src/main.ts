import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';
import * as cookieParser from 'cookie-parser';

import { datamodelMapper } from './admin';
import { AppModule } from './app.module';

const prisma = new PrismaClient();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  const logger = new Logger(AppModule.name);

  const configService = app.get(ConfigService);
  const port = configService.get('API_PORT') || 3000;

  const AdminJS = await import('adminjs');
  const AdminJSExpress = (await import('@adminjs/express')).default;
  const AdminJSPrisma = (await import('@adminjs/prisma')).default;
  const passwordsFeature = (await import('@adminjs/passwords')).default;
  const ComponentLoader = AdminJS.ComponentLoader;
  const componentLoader = new ComponentLoader();

  AdminJS.default.registerAdapter({
    Resource: AdminJSPrisma.Resource,
    Database: AdminJSPrisma.Database,
  });

  // Workaround - https://github.com/SoftwareBrothers/adminjs-prisma/issues/35
  const { models, enumMap } = datamodelMapper();

  const adminOptions = {
    // We pass User to `resources`
    resources: [
      {
        resource: { client: prisma, model: models['User'], enumMap },
        features: [
          passwordsFeature({
            componentLoader,
            properties: { encryptedPassword: 'password' },
            hash: argon2.hash,
          }),
        ],
        options: {
          id: 'user',
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

  await app.listen(port, () => {
    logger.log(`Application successfully started on http://localhost:${port}`);

    logger.log(
      `AdminJS started on http://localhost:${port}${admin.options.rootPath}`,
    );
  });
}

bootstrap();
