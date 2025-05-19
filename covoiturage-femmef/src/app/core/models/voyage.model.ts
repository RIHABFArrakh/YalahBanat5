export interface Voyage {
  id: number;
  depart: string;
  destination: string;
  dateDepart: string; // ou Date si tu les convertis
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
