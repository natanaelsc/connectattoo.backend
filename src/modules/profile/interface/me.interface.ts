export interface IMeProfile {
  displayName: string;
  username: string;
  birthDate: string;
  imageProfile: any; // Será implementado posteriormente
  tags: { id: string; name: string }[];
  appointment: any; // Será implementado posteriormente
}
