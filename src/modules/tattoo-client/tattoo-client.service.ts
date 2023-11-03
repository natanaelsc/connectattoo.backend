import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../user/dtos/create-user.dto';
import { CreateUser } from '../user/models/create-user';
import { UserRepository } from '../user/user.repository';
import { TattooClient } from './tattoo-client';
import { TattooClientRepository } from './tattoo-client.repository';

@Injectable()
export class TattooClientService {
  constructor(
    private readonly tattooClientRepository: TattooClientRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<TattooClient> {
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
    );

    const user = await this.tattooClientRepository.create(createUser);
    return user;
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
