import { Injectable } from '@nestjs/common';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Buckets } from './enum/bucket.enum';

@Injectable()
export class S3Service {
  constructor(private s3Client: S3Client) {}

  async uploadFile(
    bucket: Buckets,
    path: string,
    filename: string,
    file: Buffer,
  ) {
    if (!path.endsWith('/')) {
      path = path + '/';
    }

    const object = new PutObjectCommand({
      Bucket: bucket,
      Key: `${path}/${filename}`,
      Body: file,
    });

    await this.s3Client.send(object);

    return { filename, path };
  }
}
