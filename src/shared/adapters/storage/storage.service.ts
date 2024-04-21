import { Injectable } from '@nestjs/common';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { IUploadFile } from './interface/upload-file.interface';

@Injectable()
export class StorageService {
  constructor(private storageClient: S3Client) {}

  async uploadFile(
    path: string,
    filename: string,
    file: Buffer,
  ): Promise<IUploadFile> {
    if (!path.endsWith('/')) {
      path = path + '/';
    }

    const object = new PutObjectCommand({
      Bucket: process.env.STORAGE_BUCKET,
      Key: `${path}/${filename}`,
      Body: file,
    });

    await this.storageClient.send(object);

    return { filename, path };
  }
}
