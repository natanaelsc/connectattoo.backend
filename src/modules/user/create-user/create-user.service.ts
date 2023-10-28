import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import { AppService } from 'src/app.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class CreateUserService {
  private confirmationKey: string;
  private email: string;
  constructor(
    private readonly appService: AppService,
    private readonly prisma: PrismaService,
  ) {}

  public async create(createUserDto: CreateUserDto) {
    const name = createUserDto.name.split(' ');
    const firstName = name[0];
    const lastName = name[1];
    const password = await bcrypt.hash(createUserDto.password, 10);
    delete createUserDto.password;
    const birthday = new Date(createUserDto.birthDate)
      .toISOString()
      .slice(0, 10);
    const data = {
      email: createUserDto.email,
      password,
      name: firstName,
      lastName,
      birthday,
      confirmation_key: randomUUID().replace(/-/g, ''),
      confirmation_sit: 0,
    };
    await this.isEmailFound(data);

    const createdUser = await this.prisma.user
      .create({ data })
      .catch(async (error) => {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'Erro no cadastro do usuário',
          },
          HttpStatus.BAD_REQUEST,
          {
            cause: error,
          },
        );
      });

    await this.appService.sendEmail(data.email, data.confirmation_key);

    this.confirmationKey = data.confirmation_key;
    this.email = data.email;
    return {
      ...createdUser,
      password: undefined,
    };
  }

  async isEmailFound(data: { email: string }): Promise<void> {
    const dataBaseEmail = await this.prisma.user.findMany({
      select: { email: true },
    });

    const listEmailDataBase: any[] = [];
    dataBaseEmail.forEach((item) => {
      const foundEmailDatabase = item.email;
      listEmailDataBase.push(foundEmailDatabase);
    });

    const existEmailInDataBase = listEmailDataBase.includes(data.email);

    if (existEmailInDataBase) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'E-mail já cadastrado',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
