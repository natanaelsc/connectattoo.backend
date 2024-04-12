import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { IRegisterUser } from 'src/modules/auth/interfaces/register-user.interface';
import { ISO8601 } from 'src/shared/interface/ISO8601.type';

export class RegisterUserDto implements IRegisterUser {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsStrongPassword()
  password: string;

  @IsNotEmpty()
  @IsDateString({ strict: true })
  birthDate: ISO8601;

  @IsNotEmpty()
  @IsBoolean()
  termsAccepted: boolean;
}
