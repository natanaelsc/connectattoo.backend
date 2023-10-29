import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleErrors } from 'src/shared/utils/handle-errors.util';
import { CreateUser, UpdateUser, User } from './user.entity';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(createUser: CreateUser): Promise<User> {
    const user = await this.prisma.user
      .create({ data: createUser })
      .catch((error) => handleErrors(error));
    return user as User;
  }

  async update(updateUser: UpdateUser): Promise<User> {
    const { id, email, isEmailConfirmed } = updateUser;
    const user = await this.prisma.user
      .update({
        where: { id, email },
        data: { isEmailConfirmed },
      })
      .catch((error) => handleErrors(error));
    return user as User;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.prisma.user
      .findUnique({ where: { email } })
      .catch(() => null);
    return user;
  }
}
