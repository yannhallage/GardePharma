

export interface UpdateUserProfilePayload {
  // identification: string;
  nom: string;
  prenom: string;
  email: string;
  numero?: string;
  motdepasse?: string;
  avatar?: File | null;
}
