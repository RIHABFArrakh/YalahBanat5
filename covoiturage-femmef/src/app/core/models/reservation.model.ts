export interface Passager {
  id: number;
  nom: string;
  address: string;
  phone: string;
  membershipDate: string;
}

export interface Reservation {
  id: number;
  dateReservation: string;
  statut: string;
  passager: Passager;
  nombrePlaces: number;
}