export interface User {
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly password: string;
  readonly birthDate: string;
  readonly isEmailConfirmed: boolean;
}
