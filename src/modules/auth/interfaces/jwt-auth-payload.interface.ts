export interface JwtAuthPayload {
  profileId: string;
  userId: string;
  email: string;
  isEmailConfirmed: boolean;
  isArtist: boolean;
}
