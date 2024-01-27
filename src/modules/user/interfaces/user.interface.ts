export interface IUser {
  id?: string;
  password: string;
  email: string;
  termsAccepted: boolean;
  isEmailConfirmed?: boolean;
}
