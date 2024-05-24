import { S3Client, S3ClientConfig } from '@aws-sdk/client-s3';
import { Module } from '@nestjs/common';
import { StorageService } from './storage.service';

@Module({
  providers: [
    {
      provide: StorageService,
      useFactory() {
        const credentials: S3ClientConfig = {
          endpoint: process.env.STORAGE_ENDPOINT,
          region: process.env.STORAGE_REGION,
          credentials: {
            accessKeyId: process.env.STORAGE_ACCESS_KEY_ID!,
            secretAccessKey: process.env.STORAGE_SECRET_ACCESS_KEY!,
          },
          forcePathStyle: true,
        };

        const storageClient = new S3Client(credentials);

        return new StorageService(storageClient);
      },
    },
  ],
  exports: [StorageService],
})
export class StorageModule {}
