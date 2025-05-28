import { User } from "./user.model";

// conductrice.model.ts
export interface Conductrice {
    numeroPermis: string;
    voiture: string;
    // Ajoutez d'autres champs si nécessaires
            user?: User;
    
  }