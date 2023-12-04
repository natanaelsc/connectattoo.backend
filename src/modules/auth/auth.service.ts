import { Injectable } from '@nestjs/common';
import { UserLoginDto } from './dtos/user-login.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtSignature } from './interfaces/jwt-signature.interface';
import { AuthStrategy } from './strategies/auth.strategy';
import { UserService } from '../user/user.service';
import { IUser } from '../user/interfaces/user.interface';
import { IRegisterUser } from './interfaces/register.interface';
import { AuthUtil } from 'src/shared/utils/auth.util';
import { MailerService } from '@nestjs-modules/mailer';
import { MailStrategy } from './strategies/mail.strategy';
import { AuthBusinessExceptions } from './exceptions/auth-business.exceptions';
@Injectable()
export class AuthService {
  constructor(
    private authStrategy: AuthStrategy,
    private mailStrategy: MailStrategy,
    private mailerService: MailerService,
    private userService: UserService,
  ) {}

  async register(userData: IRegisterUser): Promise<IUser> {
    const password = AuthUtil.hash(userData.password);

    const signature = await this.mailStrategy.sign({
      email: userData.email,
    });

    const createdUser = await this.userService.createUser({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password,
      accessToken: signature.accessToken,
      birthDate: userData.birthDate,
      termsAccepted: userData.termsAccepted,
    });

    // await this.mailerService.sendMail({
    //   to: createdUser.email,
    //   subject: 'Confirmação de Cadastro',
    //   template: 'email-confirmation',
    //   context: {
    //     username: createdUser.firstName,
    //     url: `${process.env.EMAIL_CONFIRMATION_URL}?token=${access_token}`,
    //   },
    // });

    return createdUser;
  }

  async login(userLoginDto: UserLoginDto): Promise<JwtSignature> {
    const user = await this.userService.getUserByEmail(userLoginDto.email);

    if (!user || !AuthUtil.verify(userLoginDto.password, user.password))
      throw AuthBusinessExceptions.invalidCredentialsException();

    if (!user.isEmailConfirmed) {
      throw AuthBusinessExceptions.emailNotVerifiedException();
    }

    const payload: JwtPayload = {
      userId: user.id,
      uuid: user.uuid,
      email: user.email,
      isArtist: await this.userService.isArtist(user.id),
    };

    return await this.authStrategy.sign(payload);
  }

  async confirmUser(token: string) {
    const { email } = await this.mailStrategy.verify(token);

    const user = await this.userService.getUserByEmail(email);

    if (!user) throw AuthBusinessExceptions.emailNotFoundException();

    if (user.isEmailConfirmed)
      throw AuthBusinessExceptions.emailAlreadyVerifiedException();

    return await this.userService.confirmUser(email);
  }
}
