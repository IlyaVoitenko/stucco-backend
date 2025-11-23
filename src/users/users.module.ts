import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AwsService } from 'src/shared/aws.services';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, AwsService],
  exports: [UsersService],
})
export class UsersModule {}
