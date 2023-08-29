import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';

import { AppModule } from '@/app.module';
import { AuthService } from '@/auth/auth.service';

import { SetupAdminOptions } from './types';

const prisma = new PrismaClient();

const authenticate = async (email: string, password: string) => {
  try {
    const app = await NestFactory.createApplicationContext(AppModule);
    const authService = app.get(AuthService);

    const admin = await authService.signInAdmin(email, password);

    return admin;
  } catch {
    return null;
  }
};

export default async function setupAdmin(
  app: INestApplication,
  configService: ConfigService,
  options: SetupAdminOptions,
) {
  const { port } = options;
  const nodeEnv = configService.get('NODE_ENV');

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

  const companyName = configService.get<string>('ADMINJS_COMPANY_NAME');
  const appVersion = configService.get<string>('ADMINJS_APP_VERSION');
  const cookieName = configService.get('ADMINJS_AUTH_COOKIE_NAME');
  const sessionSecret = configService.get('ADMINJS_AUTH_SESSION_SECRET');

  // Icons from https://feathericons.com/
  const adminOptions = {
    componentLoader,
    branding: {
      companyName,
      withMadeWithLove: false,
    },
    version: {
      app: appVersion,
    },
    dashboard: {
      component: componentLoader.add(
        'Dashboard',
        './components/Dashboard/index.tsx',
      ),
    },
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
  };
  const admin = new AdminJS.default(adminOptions);
  const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
    admin,
    {
      authenticate,
      cookieName,
      cookiePassword: sessionSecret,
    },
    null,
    {
      resave: true,
      saveUninitialized: true,
      secret: sessionSecret,
      cookie: {
        httpOnly: nodeEnv === 'production',
        secure: nodeEnv === 'production',
      },
      name: 'adminjs',
    },
  );
  app.use(admin.options.rootPath, adminRouter);

  return {
    successMessage: `AdminJS started on http://localhost:${port}${admin.options.rootPath}`,
  };
}
