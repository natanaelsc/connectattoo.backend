import { TermsNotAcceptedException } from 'src/shared/exceptions/general.exceptions';
import { Address } from '../interfaces/address.interface';

export class CreateUser {
  address?: Address;
  readonly isEmailConfirmed: boolean;

  private constructor(
    readonly firstName: string,
    readonly lastName: string,
    readonly email: string,
    readonly password: string,
    readonly birthDate: string,
    readonly termsAccepted: boolean,
  ) {}

  public static create(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    birthDate: string,
    termsAccepted: boolean,
  ): CreateUser {
    birthDate = new Date(birthDate).toISOString().slice(0, 10);
    if (termsAccepted === false) throw new TermsNotAcceptedException();
    const createUser = new CreateUser(
      firstName,
      lastName,
      email,
      password,
      birthDate,
      termsAccepted,
    );
    return createUser;
  }
}
