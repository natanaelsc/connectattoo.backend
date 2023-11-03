export interface Payload {
  sub: string;
  email: string;
  type: string;
  iat?: number;
  exp?: number;
}
