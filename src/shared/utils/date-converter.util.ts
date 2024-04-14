type ISO8601 = `${number}-${number}-${number}`;

export class DateConverter {
  static toISO8601(date: Date): ISO8601 {
    return date.toISOString().split('T')[0] as ISO8601;
  }

  static fromISO8601(date: ISO8601): Date {
    return new Date(date);
  }
}
