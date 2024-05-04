import { Injectable } from '@nestjs/common';
import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
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

    const key = `${path}${filename}`;

    const object = new PutObjectCommand({
      Bucket: process.env.STORAGE_BUCKET,
      Key: key,
      Body: file,
    });

    await this.storageClient.send(object);

    return { filename, path, key };
  }

  async deleteFile(key: string) {
    const object = new DeleteObjectCommand({
      Bucket: process.env.STORAGE_BUCKET,
      Key: key,
    });

    await this.storageClient.send(object);
  }
}
