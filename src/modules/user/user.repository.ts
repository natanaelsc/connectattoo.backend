import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleErrors } from 'src/shared/utils/handle-errors.util';
import { Collection } from './enums/collection.enum';
import { User } from './interfaces/user.interface';
import { UpdateUser } from './models/update-user';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User> {
    let user: User;
    for (const collection of Object.values(Collection)) {
      user = await this.prisma[collection]
        .findUnique({ where: { email } })
        .catch(() => null);
      if (user != null) break;
    }
    return user;
  }

  async update(updateUser: UpdateUser): Promise<User> {
    const { id, email, isEmailConfirmed } = updateUser;
    let user: User;
    for (const collection of Object.values(Collection)) {
      user = await this.prisma[collection]
        .update({
          where: { id, email },
          data: { isEmailConfirmed },
        })
        .catch((error) => handleErrors(error));
      if (user != null) break;
    }
    return user;
  }
}
