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

  app.enableCors({
    origin: [configService.get<string>('WEB_URL')],
    // To send cookies to other domains
    credentials: true,
  });

  app.use(cookieParser());

  if (configService.get<string>('NODE_ENV') === 'production') {
    app.use(helmet());
  }

  app.useGlobalPipes(new ValidationPipe());

  const admin = await setupAdmin(app, configService);

  const port = configService.get<number>('API_PORT');

  await app.listen(port, () => {
    logger.log(
      `Application successfully started on http://localhost:${port}/graphql`,
    );

    logger.log(admin.successMessage);
  });
}

bootstrap();
