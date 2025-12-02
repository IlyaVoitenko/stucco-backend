import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller.js';
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
  providers: [AuthService, PrismaService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
