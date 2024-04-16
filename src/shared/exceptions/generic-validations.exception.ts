import { BadRequestException } from '@nestjs/common';

export class GenericValidationsExceptions {
  static NotIsArrayException() {
    throw new BadRequestException('Value is not an array');
  }

  static ArrayLengthException() {
    throw new BadRequestException('Array length is invalid');
  }

  static DuplicatedIndexException() {
    throw new BadRequestException('index is duplicated on array');
  }
}
