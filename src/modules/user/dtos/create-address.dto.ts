import { IsNotEmpty, IsOptional, IsPostalCode, IsString } from 'class-validator';
import { IAddress } from '../interfaces/address.interface';

export class CreateAddressDto implements IAddress {
  @IsNotEmpty()
  @IsString()
  street: string;

  @IsNotEmpty()
  @IsString()
  number: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  state: string;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsNotEmpty()
  @IsPostalCode('BR')
  zipCode: string;

  @IsNotEmpty()
  @IsString()
  neighborhood: string;

  @IsOptional()
  @IsString()
  complement?: string;
}
