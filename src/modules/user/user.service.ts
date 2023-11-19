import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dtos/create-user.dto';
import { CreateUser } from './models/create-user';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<CreateUser> {
    const email = createUserDto.email;
    const emailAlreadyInUse = await this.userRepository.findByEmail(email);

    if (emailAlreadyInUse !== null) {
      throw new BadRequestException(`Usuário já cadastrado`);
    }

    const name = createUserDto.name.split(' ');
    const firstName = name[0];
    const lastName = name[1];

    this.comparePasswords(
      createUserDto.password,
      createUserDto.passwordConfirmation,
    );

    const password = await bcrypt.hash(createUserDto.password, 10);

    delete createUserDto.password;
    delete createUserDto.passwordConfirmation;

    const createUser = CreateUser.create(
      firstName,
      lastName,
      email,
      password,
      createUserDto.birthDate,
      createUserDto.termsAccepted,
    );
    return createUser;
  }

  private comparePasswords(
    password: string,
    passwordConfirmation: string,
  ): boolean {
    if (password !== passwordConfirmation) {
      throw new BadRequestException('Senhas não conferem');
    }
    return true;
  }
}
