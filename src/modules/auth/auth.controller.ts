import { Body, Controller, Post } from '@nestjs/common';
import { UserLoginDto, UserToken } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() userLoginDto: UserLoginDto): Promise<UserToken> {
    const userToken = await this.authService.login(userLoginDto);
    return userToken;
  }
}
