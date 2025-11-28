import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service.js';
import { CategoriesController } from './categories.controller.js';
import { PrismaService } from '../prisma.service.js';
import { AwsService } from '../shared/aws.services.js';

@Module({
  imports: [],
  controllers: [CategoriesController],
  providers: [CategoriesService, PrismaService, AwsService],
})
export class CategoriesModule {}
