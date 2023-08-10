import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger(AppModule.name);
  const configService = app.get(ConfigService);
  const port = configService.get('API_PORT') || 3000;

  await app.listen(port);

  logger.log(`Application successfully started on port ${port}`);
}

bootstrap();
