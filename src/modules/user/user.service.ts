import { Injectable } from '@nestjs/common';
import { IUser } from './interfaces/user.interface';
import { User } from '@prisma/client';
import { AuthBusinessExceptions } from '../auth/exceptions/auth-business.exceptions';
import { UserRepository } from './user.repository';
import { IAddress } from './interfaces/address.interface';
import { IGetConfirmed } from './interfaces/get-confirmed.interface';
import { IGetUserAndProfileByEmail } from './interfaces/get-user-profile-by-email.interface';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.getUserByEmail(email);

    if (!user) throw AuthBusinessExceptions.userNotFoundException();

    return user;
  }

  async getUserAndProfileByEmail(
    email: string,
  ): Promise<IGetUserAndProfileByEmail> {
    const userAndProfile = await this.userRepository.getUserAndProfileByEmail(
      email,
    );

    if (!userAndProfile?.profile)
      throw AuthBusinessExceptions.userNotFoundException();

    return userAndProfile;
  }

  async createUser(userData: IUser): Promise<User> {
    const user = await this.userRepository.getUserByEmail(userData.email);

    if (user) throw AuthBusinessExceptions.emailAlreadyRegisteredException();

    return await this.userRepository.create(userData);
  }

  async createArtist(userId: string, address: IAddress): Promise<void> {
    await this.userRepository.createArtist(userId, address);
  }

  async confirmUser(email: string): Promise<void> {
    await this.userRepository.update({ email }, { isEmailConfirmed: true });
  }

  async getConfirmedUser(email: string): Promise<IGetConfirmed> {
    const user = await this.userRepository.getUserByEmail(email);

    if (!user) throw AuthBusinessExceptions.userNotFoundException();

    return { emailConfirmed: !!user.isEmailConfirmed };
  }
}
