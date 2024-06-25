import { PipeTransform, Injectable } from '@nestjs/common';
import { GenericValidationsExceptions } from '../exceptions/generic-validations.exception';

@Injectable()
export class ArrayLengthPipe implements PipeTransform {
  constructor(
    private min: number,
    private max: number,
  ) {}

  transform(value: string[]) {
    if (!Array.isArray(value)) this.notIsArrayValidation();

    if (value.length > this.max || value.length < this.min)
      this.arrayLengthValidation();

    return value;
  }

  protected notIsArrayValidation() {
    throw GenericValidationsExceptions.NotIsArrayException();
  }

  protected arrayLengthValidation() {
    throw GenericValidationsExceptions.ArrayLengthException();
  }
}
