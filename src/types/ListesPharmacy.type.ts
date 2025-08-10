

export interface AddPharmacyUserPayload {
  
  id: string,
  identification?: string;
  nom_pharmacie: string;
  email?: string;
  chef_pharmacie: string;
  lieu?: string;
  commune: string;
  numero: string;
  details?: string;
  // motdepasse?: string;
}

export interface AddPharmacyUserResponse {
  message: string;
  userId?: string;
}


export type ListPharmacyByAdminResponse = {
  success: boolean;
  message: string;
  data: AddPharmacyUserPayload[];
};