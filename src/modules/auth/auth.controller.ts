import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Get,
  Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dtos/user-login.dto';
import { JwtSignature } from './interfaces/jwt-signature.interface';
import { CreateUserDto } from '../user/dtos/create-user.dto';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/confirm')
  async confirmEmail(@Query('token') token: string): Promise<void> {
    await this.authService.confirmUser(token);
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() userLoginDto: UserLoginDto): Promise<JwtSignature> {
    return await this.authService.login(userLoginDto);
  }

  @Post('/register')
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.authService.register(createUserDto);
  }
}
