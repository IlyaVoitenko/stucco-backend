import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service.js';
import { CategoriesController } from './categories.controller.js';
import { PrismaService } from '../prisma.service.js';
import { AwsService } from '../shared/aws.services.js';
import { JwtModule } from '@nestjs/jwt';

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
  controllers: [CategoriesController],
  providers: [CategoriesService, PrismaService, AwsService],
})
export class CategoriesModule {}
