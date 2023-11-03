import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../user/dtos/create-user.dto';
import { UserService } from '../user/user.service';
import { TattooClientRepository } from './tattoo-client.repository';
import { TattooClient } from './tattoo-client';

@Injectable()
export class TattooClientService {
  constructor(
    private readonly tattooClientRepository: TattooClientRepository,
    private readonly userService: UserService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<TattooClient> {
    const createUser = await this.userService.create(createUserDto);
    delete createUserDto.password;
    delete createUserDto.passwordConfirmation;
    const user = await this.tattooClientRepository.create(createUser);
    return user;
  }
}
