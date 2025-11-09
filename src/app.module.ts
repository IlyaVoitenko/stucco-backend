import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CategoriesModule } from './categories/categories.module';
import { AwsService } from './shared/aws.services';
import { AwsModule } from './aws.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AwsModule,
    CategoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService, AwsService],
})
export class AppModule {}
