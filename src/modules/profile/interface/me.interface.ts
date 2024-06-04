export interface IMeProfile {
  name: string;
  username: string;
  email: string;
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
