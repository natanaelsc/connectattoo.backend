import { Address } from '../interfaces/address.interface';

export class CreateUser {
  readonly isEmailConfirmed: boolean;

  private constructor(
    readonly firstName: string,
    readonly lastName: string,
    readonly email: string,
    readonly password: string,
    readonly birthDate: string,
    readonly address?: Address,
  ) {
    this.birthDate = new Date(birthDate).toISOString().slice(0, 10);
  }

  public static create(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    birthDate: string,
    address?: Address,
  ): CreateUser {
    return new CreateUser(
      firstName,
      lastName,
      email,
      password,
      birthDate,
      address,
    );
  }
}
