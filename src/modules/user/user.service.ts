import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { MailService } from '../mail/mail.service';
import { CreateUserDto } from './user.dto';
import { CreateUser, UpdateUser, User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly mailService: MailService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
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

    const user = await this.userRepository.create(createUser);
    return user;
  }

  async update(updateUser: UpdateUser): Promise<User> {
    return await this.userRepository.update(updateUser);
  }

  async getByEmail(email: string): Promise<User> {
    return this.userRepository.findByEmail(email);
  }

  async confirmEmail(token: string): Promise<void> {
    const email = await this.mailService.decodeConfirmationToken(token);
    const user = await this.getByEmail(email);
    if (user === null) throw new BadRequestException(`Usuário não encontrado`);
    if (user.isEmailConfirmed === true)
      throw new BadRequestException('Email verificado');
    await this.update({
      id: user.id,
      email,
      isEmailConfirmed: true,
    });
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
