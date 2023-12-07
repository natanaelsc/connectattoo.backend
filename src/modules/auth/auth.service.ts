import { Injectable } from '@nestjs/common';
import { UserLoginDto } from './dtos/user-login.dto';
import { JwtAuthPayload } from './interfaces/jwt-auth-payload.interface';
import { JwtSignature } from './interfaces/jwt-signature.interface';
import { UserService } from '../user/user.service';
import { IRegisterUser } from './interfaces/register-user.interface';
import { HashUtil } from 'src/shared/utils/hash.util';
import { AuthBusinessExceptions } from './exceptions/auth-business.exceptions';
import { JwtStrategies } from './jwt.strategies';
import { IUser } from '../user/interfaces/user.interface';
import { MailService } from '~/shared/adapters/mail/mail.service';
import { IRegisterArtist } from './interfaces/register-artist.interface';

@Injectable()
export class AuthService {
  constructor(
    private jwtStrategies: JwtStrategies,
    private mailService: MailService,
    private userService: UserService,
  ) {}

  async registerUser(userData: IRegisterUser): Promise<JwtSignature> {
    const createdUser = await this.createUser(userData);

    return { accessToken: createdUser.accessToken };
  }

  async registerArtist(artistData: IRegisterArtist) {
    const createdUser = await this.createUser(artistData);

    await this.userService.createArtist(createdUser.id, artistData.address);

    return { accessToken: createdUser.accessToken };
  }

  async login(userLoginDto: UserLoginDto): Promise<JwtSignature> {
    const user = await this.userService.getUserByEmail(userLoginDto.email);

    if (!user) throw AuthBusinessExceptions.invalidCredentialsException();

    const isValidPassword = HashUtil.verify(
      userLoginDto.password,
      user.password,
    );

    if (!isValidPassword)
      throw AuthBusinessExceptions.invalidCredentialsException();

    if (!user.isEmailConfirmed) {
      throw AuthBusinessExceptions.emailNotVerifiedException();
    }

    const payload: JwtAuthPayload = {
      userId: user.id,
      email: user.email,
      isArtist: !!user.tattooArtistId,
    };

    return await this.jwtStrategies.auth.sign(payload);
  }

  async confirmUser(token: string): Promise<void> {
    const { email } = await this.jwtStrategies.mail.verify(token);

    const user = await this.userService.getUserByEmail(email);

    if (!user) throw AuthBusinessExceptions.emailNotFoundException();

    if (user.isEmailConfirmed)
      throw AuthBusinessExceptions.emailAlreadyVerifiedException();

    await this.userService.confirmUser(email);
  }

  private async createUser(
    userData: IRegisterUser,
  ): Promise<JwtSignature & Required<IUser>> {
    const password = HashUtil.hash(userData.password);

    const { accessToken } = await this.jwtStrategies.mail.sign({
      email: userData.email,
    });

    const createdUser = await this.userService.createUser({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password,
      birthDate: userData.birthDate,
      termsAccepted: userData.termsAccepted,
    });

    await this.mailService.sendConfirmationEmail(
      createdUser.email,
      createdUser.firstName,
      accessToken,
    );

    return { ...createdUser, accessToken };
  }
}
