import { InternalServerErrorException } from '@nestjs/common';
import { ISO8601 } from 'src/shared/interface/ISO8601.type';

export class DateConverter {
  static toISO8601(date: Date): ISO8601 {
    if (!date) throw new InternalServerErrorException('Date is required');

    return date.toISOString().split('T')[0] as ISO8601;
  }

  static fromISO8601(date: ISO8601): Date {
    if (!date) throw new InternalServerErrorException('Date is required');

    return new Date(date);
  }
}
