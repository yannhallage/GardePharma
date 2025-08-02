

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

export interface AttributCreerGarde {
  // reference: string;
  id:string;
  date: string;
  type: 'Jour' | 'Nuit' | 'Week-end' | 'Férié';
  nom_pharmacie: string;
  responsable: string;
  commune: string;
  statut: 'En attente' | 'Validée' | 'Rejetée';
  commentaire?: string;
}
