import { IsEmail, IsStrongPassword } from 'class-validator';

export class UserLoginDto {
  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;
}

export interface UserPayload {
  id: string;
  name: string;
  email: string;
  type: string;
  iat?: number;
  exp?: number;
}

export enum UserType {
  CLIENT = 'client',
  ARTIST = 'artist',
}

export interface UserToken {
  access_token: string;
}
