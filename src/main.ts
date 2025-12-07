import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common/pipes/index.js';
import cookieParser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: process.env.PRODUCTION_URL || 'http://localhost:5173',
    credentials: true,
  });
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
