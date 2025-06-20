import { User } from "./user.model";

export interface Passager {
    id: number;
    nom: string;
    voyage: string;
    phone: string;
    membershipDate: string; // ou Date, selon ton backend
    userId?: number; // facultatif si utilisé
        user?: User;
  }