import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ConfigModule } from '@nestjs/config';
import { CategoriesModule } from './categories/categories.module.js';
import { UsersModule } from './users/users.module.js';
import { AwsService } from './shared/aws.services.js';
import { AwsModule } from './aws.module.js';
import { PrismaService } from './prisma.service.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AwsModule,
    CategoriesModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, AwsService, PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
