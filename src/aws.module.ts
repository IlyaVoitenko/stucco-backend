import { Module } from '@nestjs/common';
import { AwsService } from '../src/shared/aws.services.js';

@Module({
  providers: [AwsService],
  exports: [AwsService],
})
export class AwsModule {}
