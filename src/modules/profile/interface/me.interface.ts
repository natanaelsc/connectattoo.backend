export interface IMeProfile {
  displayName: string;
  username: string;
  email: string | null;
  birthDate: string;
  imageProfile: any; // Será implementado posteriormente
  tags: { id: string; name: string }[];
  appointment: any; // Será implementado posteriormente
  galleries: IGalleries[];
}

interface IGalleries {
  id: string;
  name: string;
  cover: string;
}
