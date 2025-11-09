import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { PrismaService } from 'src/prisma.service';
import { AwsService } from 'src/shared/aws.services';

@Module({
  imports: [],
  controllers: [CategoriesController],
  providers: [CategoriesService, PrismaService, AwsService],
})
export class CategoriesModule {}
