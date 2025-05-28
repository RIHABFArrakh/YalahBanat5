export interface UserProfileDTO {
  id: number;
  name: string;
  email: string;
  role: string; // 'passager' or 'conductrice'
  telephone?: string; // Assuming these are directly on the DTO
  ville?: string; // Assuming these are directly on the DTO (address might map to ville)
  bio?: string; // Assuming these are directly on the DTO
  note?: number; // Assuming these are directly on the DTO
  nombreTrajets?: number; // Assuming this is directly on the DTO
  membreDepuis?: string; // Assuming this is directly on the DTO (membershipDate might map to membreDepuis)

  // If your backend UserProfileDTO has nested objects for passager/conductrice details,
  // you might need to adjust this DTO structure and the mapping in the component.
  // Example if nested:
  // passagerProfile?: { phone?: string; address?: string; membershipDate?: string; /* other passager fields */ };
  // conductriceProfile?: { phone?: string; address?: string; note?: number; totalTrips?: number; /* other conductrice fields */ };
} 