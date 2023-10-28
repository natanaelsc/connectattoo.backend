import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleErrors } from 'src/shared/utils/handle-errors.util';
import { CreateUser } from './create-user/create-user';
import { User } from './user.interface';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(createUser: CreateUser): Promise<User> {
    const user = await this.prisma.user
      .create({ data: createUser })
      .catch((error) => handleErrors(error));
    return user as User;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user;
  }

  async updateConfirmationSit(
    userId: string,
    isEmailConfirmed: boolean,
  ): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: { isEmailConfirmed },
    });
  }
}
