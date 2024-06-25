import { ArrayLengthPipe } from '~/shared/utils/array-length.util';
import { TagBusinessExceptions } from '../exceptions/tags-business.exceptions';

export class TagArrayLengthPipe extends ArrayLengthPipe {
  constructor(min: number, max: number) {
    super(min, max);
  }

  protected arrayLengthValidation(): void {
    throw TagBusinessExceptions.tagsLengthIncorrectException();
  }
}
