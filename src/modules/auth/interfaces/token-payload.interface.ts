export interface TokenPayload {
  sub: string;
  email: string;
  type: string;
  iat?: number;
  exp?: number;
}
