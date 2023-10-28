import { User } from '../entities/user.entity';
import { IsEmail, IsString, Matches } from 'class-validator';

export class CreateUserDto extends User {
  @IsEmail()
  email: string;

  @IsString()
  @Matches(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}.$/,
    {
      message: 'A senha não cumpre com os requisitos informados',
    },
  )
  password: string;

  @IsString()
  name: string;

  @IsString()
  lastName: string;

  @Matches(/^(0[1-9]|[2][0-9]|3[01])\/(0[1-9]|1[1,2])\/(19|20)\d{2}.*$/, {
    message: 'Data no formato incorreto',
  })
  birthday: string;
}
