import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserArtistDto } from './dtos/create-user-artist.dto';
import { TattooArtist } from './tattoo-artist';
import { TattooArtistRepository } from './tattoo-artist.repository';

@Injectable()
export class TattooArtistService {
  constructor(
    private readonly tattooArtistRepository: TattooArtistRepository,
    private readonly userService: UserService,
  ) {}

  async create(createUserDto: CreateUserArtistDto): Promise<TattooArtist> {
    const createUser = await this.userService.create(createUserDto);
    delete createUserDto.password;
    delete createUserDto.passwordConfirmation;
    createUser.address = createUserDto.address;
    const user = await this.tattooArtistRepository.create(createUser);
    return user;
  }
}
