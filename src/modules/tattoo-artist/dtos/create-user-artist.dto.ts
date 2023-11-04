import { IsNotEmpty } from 'class-validator';
import { CreateAddressDto } from 'src/modules/user/dtos/create-address.dto';
import { CreateUserDto } from 'src/modules/user/dtos/create-user.dto';

export class CreateUserArtistDto extends CreateUserDto {
  @IsNotEmpty()
  address: CreateAddressDto;
}
