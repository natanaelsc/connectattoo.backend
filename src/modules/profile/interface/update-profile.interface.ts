import { ISO8601 } from 'src/shared/interface/ISO8601.type';

export interface IUpdateProfile {
  name: string;
  username: string;
  birthDate: ISO8601;
}
