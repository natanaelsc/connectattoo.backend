export interface Payload {
  sub: number;
  email: string;
  type: string;
  iat?: number;
  exp?: number;
}
