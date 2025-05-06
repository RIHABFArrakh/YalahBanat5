export interface Voyage {
  id: number;
  depart: string;
  destination: string;
  date: string;
  heure: string;
  prix: number;
  placesDisponibles: number;
  conductrice: {
    id: number;
    nom: string;
    photo: string;
    note: number;
    nombreEvaluations: number;
  };
  status: 'ACTIF' | 'COMPLET' | 'TERMINE';
}
