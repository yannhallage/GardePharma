

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
