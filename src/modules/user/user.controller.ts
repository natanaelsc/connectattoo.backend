import { Body, Controller, Param, ParseIntPipe, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateAddressDto } from './dtos/create-address.dto';
import { CreateTattooArtistDto } from './dtos/create-tattoo-artist.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Put('/:userId/address')
  async editAddress(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() address: CreateAddressDto,
  ) {
    return await this.userService.editAddress(userId, address);
  }

  @Put('/:userId/upgrade')
  async upgrateToArtist(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() data: CreateTattooArtistDto,
  ) {
    return await this.userService.upgradeToArtist(userId, data);
  }
}
