import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class UserLoginDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}
