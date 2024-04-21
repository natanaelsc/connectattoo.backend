import { Module } from '@nestjs/common';
import { S3Service } from './s3.service';
import { S3Client } from '@aws-sdk/client-s3';

@Module({
  providers: [
    {
      provide: S3Service,
      useFactory() {
        const credentials = {
          endpoint: process.env.S3_ENDPOINT,
          region: process.env.S3_REGION,
          credentials: {
            accessKeyId: process.env.S3_ACCESS_KEY_ID!,
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
          },
        };

        return new S3Service(new S3Client(credentials));
      },
    },
  ],
  exports: [S3Service],
})
export class AWSModule {}
