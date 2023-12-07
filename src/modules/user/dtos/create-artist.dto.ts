import { IsNotEmptyObject, ValidateNested } from 'class-validator';
import { IAddress } from '../interfaces/address.interface';
import { ITattooArtist } from '../interfaces/artist.interface';
import { Type } from 'class-transformer';
import { CreateAddressDto } from './create-address.dto';
import { RegisterUserDto } from './create-user.dto';

export class RegisterTattooArtistDto
  extends RegisterUserDto
  implements ITattooArtist
{
  @ValidateNested()
  @IsNotEmptyObject()
  @Type(() => CreateAddressDto)
  address: IAddress;
}
