import { ISO8601 } from '~/shared/interface/ISO8601.type';

export interface IPatchProfile {
  name?: string;
  username?: string;
  email?: string;
  birthDate?: ISO8601;
}
