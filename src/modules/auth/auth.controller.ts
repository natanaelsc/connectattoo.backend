import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UserToken } from './auth.interface';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dtos/user-login.dto';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() userLoginDto: UserLoginDto): Promise<UserToken> {
    const userToken = await this.authService.login(userLoginDto);
    return userToken;
  }
}
