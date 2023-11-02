export interface Mail {
  email: string;
  subject: string;
  html: string;
}

export interface Payload {
  email: string;
  user: User;
  iat?: number;
  exp?: number;
}

export enum User {
  CLIENT = 'client',
  ARTIST = 'artist',
}
