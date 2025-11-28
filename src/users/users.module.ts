import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { AwsService } from '../shared/aws.services';
import { UsersController } from './users.controller.js';
import { UsersService } from './users.service.js';
@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, AwsService],
  exports: [UsersService],
})
export class UsersModule {}
