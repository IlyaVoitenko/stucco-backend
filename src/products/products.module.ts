import { Module } from '@nestjs/common';
import { ProductsService } from './products.service.js';
import { ProductsController } from './products.controller.js';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service.js';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => {
        const secret = process.env.SECRET_KEY;
        if (!secret) {
          throw new Error(
            'Missing required environment variable: SECRET_KEY. Set it to a secure JWT secret before starting the app.',
          );
        }
        return {
          global: true,
          secret,
          signOptions: { expiresIn: '6h' },
        };
      },
    }),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, PrismaService],
})
export class ProductsModule {}
