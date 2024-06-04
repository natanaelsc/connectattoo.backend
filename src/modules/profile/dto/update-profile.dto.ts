import { IsISO8601, IsNotEmpty, IsString } from 'class-validator';
import { IUpdateProfile } from '../interface/update-profile.interface';
import { ISO8601 } from 'src/shared/interface/ISO8601.type';

export class UpdateProfileDTO implements IUpdateProfile {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsISO8601()
  birthDate: ISO8601;
}
