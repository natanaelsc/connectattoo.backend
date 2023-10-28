import { Body, Controller, Post } from '@nestjs/common';
import { IsPublic } from 'src/modules/auth/decorators/is-public.decorator';
import { CreateUserDto } from './create-user.dto';
import { CreateUserService } from './create-user.service';

@Controller('create-user')
export class CreateUserController {
  constructor(private readonly createUserService: CreateUserService) {}

  @IsPublic()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.createUserService.create(createUserDto);
  }
}
