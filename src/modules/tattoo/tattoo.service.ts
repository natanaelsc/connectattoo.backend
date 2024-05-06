import { Injectable } from '@nestjs/common';
import { TATTOO_RANDOM_MOCK } from '../../shared/constants/tattoo-random-mock.constant';
import { IPagination } from '../../shared/interface/pagination.interface';
import { ITattooRandom } from './interface/random.interface';

@Injectable()
export class TattooService {
  random(pagination: IPagination): ITattooRandom[] {
    return TATTOO_RANDOM_MOCK.slice(
      pagination.offset,
      pagination.limit || TATTOO_RANDOM_MOCK.length,
    );
  }
}
