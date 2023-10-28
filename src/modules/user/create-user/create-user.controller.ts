import { Body, Controller, Post } from '@nestjs/common';
import { IsPublic } from 'src/modules/auth/decorators/is-public.decorator';
import { CreateUserDto } from './create-user.dto';
import { CreateUserService } from './create-user.service';

@Controller('users')
export class CreateUserController {
  constructor(private readonly createUserService: CreateUserService) {}

  @IsPublic()
  @Post('/register')
  async create(@Body() createUserDto: CreateUserDto): Promise<void> {
    await this.createUserService.create(createUserDto);
  }
}
