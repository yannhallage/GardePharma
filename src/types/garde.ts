

export interface Garde {
  id: string;
  pharmacie: string;
  titulaire: string;
  date: string;
  type: 'Jour' | 'Nuit' | 'Week-end';
  statut: 'En attente' | 'En cours';
  statutColor: string;
  commentaire: string;
}

// export interface AttributCreerGarde {
//   // reference: string;
//   id?: string;
//   date: string;
//   type: 'Jour' | 'Nuit' | 'Week-end' | 'Férié';
//   nom_pharmacie: string;
//   responsable?: string;
//   commune: string;
//   statut: 'En attente' | 'Validée' | 'Rejetée';
//   commentaire?: string;
// }

export interface AttributCreerGarde {
  _id: string,
  reference?: string;               // devient optionnel
  identification_pharma?: string;   // devient optionnel
  date: string;
  type: string;
  userId: string,                      // ex: 'Jour' | 'Nuit' | 'Week-end' | 'Férié'
  nom_pharmacie: string;
  responsable: string;
  commune: string;
  statut: string;                    // ex: 'En attente'
  commentaire?: string;
}


export interface GardeFromAPI {
  _id: string;
  reference?: string;
  identification_pharma?: string;
  date: string;
  type: string;
  userId: string;
  nom_pharmacie: string;
  responsable: string;
  commune: string;
  statut: string;
  commentaire?: string;
}

export type ListGardByAdminResponse = {
  success: boolean;
  message: string;
  data: AttributCreerGarde[];
};