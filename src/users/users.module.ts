import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';
import { AwsService } from '../shared/aws.services.js';
import { JwtModule } from '@nestjs/jwt';
import { UsersController } from './users.controller.js';
import { UsersService } from './users.service.js';
import { AuthModule } from '../auth/auth.module.js';
@Module({
  imports: [
    AuthModule,
    JwtModule.registerAsync({
      useFactory: () => {
        const secret = process.env.SECRET_KEY;
        if (!secret) {
          throw new Error(
            'Missing required environment variable: SECRET_KEY. Set it to a secure JWT secret before starting the app.',
          );
        }
        return { secret, global: true };
      },
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, PrismaService, AwsService],
  exports: [UsersService],
})
export class UsersModule {}
