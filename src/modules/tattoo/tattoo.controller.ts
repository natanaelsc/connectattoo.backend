import { Controller, Get, Query } from '@nestjs/common';
import { TattooService } from './tattoo.service';
import { PaginationDTO } from '../../shared/dto/pagination.dto';
import { ITattooRandom } from './interface/random.interface';

@Controller('tattoos')
export class TattooController {
  constructor(private tattooService: TattooService) {}

  @Get('random')
  random(@Query() pagination: PaginationDTO): ITattooRandom[] {
    return this.tattooService.random(pagination);
  }
}
