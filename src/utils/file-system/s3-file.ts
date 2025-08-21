/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetObjectCommand, HeadObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { File } from '@/utils/file-system/file';

export class S3File implements File {
  private readonly s3Client: S3Client;

  constructor(
    private readonly bucket: string,
    private readonly key: string,
    s3Client?: S3Client,
  ) {
    // Use provided client or create a new one with default configuration
    this.s3Client = s3Client || new S3Client({
      credentials: {
        // eslint-disable-next-line no-process-env
        accessKeyId: process.env.SIMONKARMAN_AWS_ACCESS_KEY_ID!,
        // eslint-disable-next-line no-process-env
        secretAccessKey: process.env.SIMONKARMAN_AWS_SECRET_ACCESS_KEY!,
      },
    });
  }

  explain(): string {
    return `S3 file system at s3://${this.bucket}/${this.key}`;
  }

  async exists(): Promise<boolean> {
    try {
      await this.s3Client.send(new HeadObjectCommand({
        Bucket: this.bucket,
        Key: this.key,
      }));
      return true;
    } catch (error: any) {
      if (error.name === 'NotFound' || error.$metadata?.httpStatusCode === 404) {
        return false;
      }
      throw error;
    }
  }

  async read(): Promise<string> {
    try {
      const response = await this.s3Client.send(new GetObjectCommand({
        Bucket: this.bucket,
        Key: this.key,
      }));

      if (!response.Body) {
        throw new Error('No content returned from S3 object');
      }

      // Convert the readable stream to string
      const chunks: Uint8Array[] = [];
      const reader = response.Body.transformToWebStream().getReader();

      try {
        // eslint-disable-next-line no-constant-condition
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          chunks.push(value);
        }
      } finally {
        reader.releaseLock();
      }

      // Combine chunks and decode as UTF-8
      const totalLength = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
      const combined = new Uint8Array(totalLength);
      let offset = 0;
      for (const chunk of chunks) {
        combined.set(chunk, offset);
        offset += chunk.length;
      }

      return new TextDecoder('utf-8').decode(combined);
    } catch (error: any) {
      if (error.name === 'NoSuchKey' || error.$metadata?.httpStatusCode === 404) {
        throw new Error(`File not found: s3://${this.bucket}/${this.key}`);
      }
      throw error;
    }
  }

  async write(data: string): Promise<void> {
    try {
      await this.s3Client.send(new PutObjectCommand({
        Bucket: this.bucket,
        Key: this.key,
        Body: data,
        ContentType: 'text/plain; charset=utf-8',
      }));
    } catch (error: any) {
      throw new Error(`Failed to write to s3://${this.bucket}/${this.key}: ${error.message}`);
    }
  }

  async ageMs(): Promise<number> {
    try {
      const response = await this.s3Client.send(new HeadObjectCommand({
        Bucket: this.bucket,
        Key: this.key,
      }));

      if (!response.LastModified) {
        throw new Error('LastModified date not available');
      }

      const lastModified = response.LastModified.getTime();
      const now = Date.now();
      return now - lastModified;
    } catch (error: any) {
      if (error.name === 'NotFound' || error.$metadata?.httpStatusCode === 404) {
        throw new Error(`File not found: s3://${this.bucket}/${this.key}`);
      }
      throw error;
    }
  }
}
