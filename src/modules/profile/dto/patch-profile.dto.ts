import { IsEmail, IsISO8601, IsOptional, IsString } from 'class-validator';
import { ISO8601 } from 'src/shared/interface/ISO8601.type';
import { IPatchProfile } from '../interface/patch-profile.interface';

export class PatchProfileDTO implements IPatchProfile {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  username: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsISO8601()
  birthDate: ISO8601;
}
