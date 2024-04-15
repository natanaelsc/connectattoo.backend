import { IsLatitude, IsLongitude, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UserLocationDto{
  @IsNotEmpty()
  @IsNumber()
  @IsLatitude()
  latitude: number;

  @IsNotEmpty()
  @IsNumber()
  @IsLongitude()
  longitude: number;

  @IsNotEmpty()
  @IsNumber()
  accuracy: number;

  @IsNotEmpty()
  @IsString()
  timestamp: string;

  @IsNotEmpty()
  @IsString()
  platform: string
}