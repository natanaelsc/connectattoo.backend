import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { IRegisterUser } from 'src/modules/auth/interfaces/register.interface';

export class CreateUserDto implements IRegisterUser {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

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

  @IsOptional()
  @IsBoolean()
  tattooArtist: boolean;
}
