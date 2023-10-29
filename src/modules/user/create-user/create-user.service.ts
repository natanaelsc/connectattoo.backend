import {
  BadRequestException,
  Injectable
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '../user.entity';
import { UserRepository } from '../user.repository';
import { CreateUser } from './create-user';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class CreateUserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async create(createUserDto: CreateUserDto): Promise<User> {
    const email = createUserDto.email;
    const emailAlreadyInUse = await this.userRepository.findByEmail(email);

    if (emailAlreadyInUse !== null) {
      throw new BadRequestException(
        `Usuário com email '${emailAlreadyInUse.email}' já cadastrado`,
      );
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
