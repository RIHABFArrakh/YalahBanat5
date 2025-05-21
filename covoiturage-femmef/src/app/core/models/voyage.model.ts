import { Conductrice } from "./conductrice.model";

export interface Voyage {
  id: number;
  depart: string;
  destination: string;
  dateDepart: string; // ou Date si tu les convertis
  prix: number;
  placesDisponibles: number;
  conductrice:Conductrice;
  status: 'ACTIF' | 'COMPLET' | 'TERMINE';
}
