import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common/pipes/index.js';
import cookieParser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const isDev = process.env.NODE_ENV !== 'production';
  app.use(cookieParser());

  app.enableCors({
    origin: isDev
      ? ['http://localhost:5173', 'http://localhost:3000']
      : [
          process.env.ADMIN_PANEL_URL!,
          process.env.PRODUCTION_STORE_WEBSITE_URL!,
        ],
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
