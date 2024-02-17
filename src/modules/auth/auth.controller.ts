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
import { RegisterUserDto } from '../user/dtos/create-user.dto';
import { RegisterTattooArtistDto } from '../user/dtos/create-artist.dto';
import { Public } from '~/shared/constants/public.constant';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Get('/confirm')
  async confirmEmail(@Query('token') mailToken: string): Promise<void> {
    await this.authService.confirmUser(mailToken);
  }

  @Public()
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() userLoginDto: UserLoginDto): Promise<JwtSignature> {
    return await this.authService.login(userLoginDto);
  }

  @Public()
  @Post('/register')
  async registerUser(
    @Body() createUserDto: RegisterUserDto,
  ): Promise<JwtSignature> {
    return await this.authService.registerUser(createUserDto);
  }

  @Public()
  @Post('/register/artist')
  async registerArtist(
    @Body() createUserDto: RegisterTattooArtistDto,
  ): Promise<JwtSignature> {
    return await this.authService.registerArtist(createUserDto);
  }
}
