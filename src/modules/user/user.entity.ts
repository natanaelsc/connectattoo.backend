export interface User {
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly password: string;
  readonly birthDate: string;
  readonly isEmailConfirmed: boolean;
}

export class CreateUser {
  readonly isEmailConfirmed: boolean;

  private constructor(
    readonly firstName: string,
    readonly lastName: string,
    readonly email: string,
    readonly password: string,
    readonly birthDate: string,
  ) {
    this.birthDate = new Date(birthDate).toISOString().slice(0, 10);
  }

  public static create(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    birthDate: string,
  ): CreateUser {
    return new CreateUser(firstName, lastName, email, password, birthDate);
  }
}

export class UpdateUser {
  readonly id: string;
  readonly email: string;
  readonly isEmailConfirmed: boolean;
}
