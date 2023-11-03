export interface TokenPayload {
  id: string;
  email: string;
  type: string;
  iat?: number;
  exp?: number;
}

export interface UserToken {
  access_token: string;
}
