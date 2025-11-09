import { Module } from '@nestjs/common';
import { AwsService } from '../src/shared/aws.services';

@Module({
  providers: [AwsService],
  exports: [AwsService], // ← вот это важно, чтобы другие могли использовать
})
export class AwsModule {}
