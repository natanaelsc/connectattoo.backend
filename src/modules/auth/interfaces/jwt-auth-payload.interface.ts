export interface JwtAuthPayload {
  userId: string;
  email: string;
  isEmailConfirmed: boolean;
  isArtist: boolean;
}
