import { Injectable } from '@nestjs/common';
import { UserLoginDto } from './dtos/user-login.dto';
import { JwtAuthPayload } from './interfaces/jwt-auth-payload.interface';
import { JwtSignature } from './interfaces/jwt-signature.interface';
import { UserService } from '../user/user.service';
import { IRegisterUser } from './interfaces/register.interface';
import { HashUtil } from 'src/shared/utils/hash.util';
import { MailerService } from '@nestjs-modules/mailer';
import { AuthBusinessExceptions } from './exceptions/auth-business.exceptions';
import { JwtStrategies } from './jwt.strategies';

@Injectable()
export class AuthService {
  constructor(
    private jwtStrategies: JwtStrategies,
    private mailerService: MailerService,
    private userService: UserService,
  ) {}

  async register(userData: IRegisterUser): Promise<JwtSignature> {
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

    await this.mailerService.sendMail({
      to: createdUser.email,
      subject: 'Confirmação de Cadastro',
      template: 'email-confirmation',
      context: {
        username: createdUser.firstName,
        url: `${process.env.EMAIL_CONFIRMATION_URL}?token=${accessToken}`,
      },
    });

    return { accessToken };
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
}
