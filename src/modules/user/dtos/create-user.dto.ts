import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { IRegisterUser } from 'src/modules/auth/interfaces/register-user.interface';

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
  birthDate: string;

  @IsNotEmpty()
  @IsBoolean()
  termsAccepted: boolean;
}
