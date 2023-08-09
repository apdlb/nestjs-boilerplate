import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('API_PORT') || 3000;

  await app.listen(port);

  console.log(`Application successfully started in port: ${port}`);
}

bootstrap();
