import { PipeTransform, Injectable } from '@nestjs/common';
import { GenericValidationsExceptions } from '../exceptions/generic-validations.exception';

@Injectable()
export class ArrayDuplicatedIndexPipe implements PipeTransform {
  transform(value: string[]) {
    if (!Array.isArray(value))
      throw GenericValidationsExceptions.NotIsArrayException();

    const uniqueValues = new Set(value);

    if (uniqueValues.size !== value.length)
      throw GenericValidationsExceptions.DuplicatedIndexException();

    return value;
  }
}
