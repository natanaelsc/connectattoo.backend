import { IsOptional, IsPositive } from 'class-validator';
import { IPagination } from '../interface/pagination.interface';
import { Transform } from 'class-transformer';

export class PaginationDTO implements IPagination {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @IsPositive()
  @Transform(({ value }) => value || 0)
  offset: number;
}
