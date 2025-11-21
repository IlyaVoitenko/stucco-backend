import { Module } from '@nestjs/common';
import { AwsService } from '../src/shared/aws.services';

@Module({
  providers: [AwsService],
  exports: [AwsService],
})
export class AwsModule {}
