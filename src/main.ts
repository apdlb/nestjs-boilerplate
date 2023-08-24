import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';

import setupAdmin from './admin';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = new Logger(AppModule.name);
  const configService = app.get(ConfigService);

  const port = configService.get('API_PORT') || 3000;

  app.enableCors({
    origin: [configService.get('WEB_URL')],
    // To send cookies to other domains
    credentials: true,
  });

  app.use(cookieParser());

  app.use(helmet());

  app.useGlobalPipes(new ValidationPipe());

  const admin = await setupAdmin(app, { port });

  await app.listen(port, () => {
    logger.log(
      `Application successfully started on http://localhost:${port}/graphql`,
    );

    logger.log(admin.successMessage);
  });
}

bootstrap();
