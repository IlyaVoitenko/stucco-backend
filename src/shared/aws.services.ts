import { Injectable } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';

@Injectable()
export class AwsService {
  private s3: S3Client;
  private bucketName: string;

  constructor(private readonly config: ConfigService) {
    if (
      !process.env.AWS_REGION ||
      !process.env.AWS_ACCESS_KEY_ID ||
      !process.env.AWS_SECRET_ACCESS_KEY
    )
      throw new Error('Missing AWS configuration in environment variables');

    this.s3 = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
    if (!process.env.AWS_BUCKET_NAME)
      throw new Error('Missing bucket name in environment variables');

    this.bucketName = process.env.AWS_BUCKET_NAME;
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const fileKey = `${randomUUID()}-${file.originalname}`;

    const uploadParams = {
      Bucket: this.bucketName,
      Key: fileKey,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    await this.s3.send(new PutObjectCommand(uploadParams));

    return `https://${this.bucketName}.s3.${this.config.get<string>(
      'AWS_REGION',
    )}.amazonaws.com/${fileKey}`;
  }
  async deleteFile(file: string): Promise<{ message: string }> {
    const deleteParams = new DeleteObjectCommand({
      Bucket: this.bucketName,
      Key: file.split('/').pop(),
    });
    await this.s3.send(deleteParams);
    return { message: `File ${file} deleted successfully` };
  }
}
