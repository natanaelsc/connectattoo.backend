import { PipeTransform, Injectable } from '@nestjs/common';
import { GenericValidationsExceptions } from '../exceptions/generic-validations.exception';

@Injectable()
export class ArrayLengthPipe implements PipeTransform {
  constructor(
    private min: number,
    private max: number,
  ) {}

  transform(value: string[]) {
    if (!Array.isArray(value))
      throw GenericValidationsExceptions.NotIsArrayException();

    if (value.length > this.max || value.length < this.min)
      throw GenericValidationsExceptions.ArrayLengthException();

    return value;
  }
}
