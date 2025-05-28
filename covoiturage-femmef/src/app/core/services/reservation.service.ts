// reservation.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
// reservation.service.ts
import { Reservation } from '../models/reservation.model';
import { Voyage } from '../models/voyage.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = 'http://localhost:8080';

  private reservationsSubject = new BehaviorSubject<Reservation[]>([]);
  reservations$ = this.reservationsSubject.asObservable();

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getReservationHistory(userId: number): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.apiUrl}/api/reservations/historique`, {
      headers: this.getHeaders()
    });
  }

  updateReservationsList(reservations: Reservation[]): void {
    this.reservationsSubject.next(reservations);
  }

  createReservation(reservationData: {
    voyageId: number;
    passagerId: number;
    nombrePlaces: number;
  }): Observable<Reservation> {
    const { voyageId, passagerId, nombrePlaces } = reservationData;
    
    // Log the request URL and data
    console.log('Making reservation request to:', 
      `${this.apiUrl}/api/reservations/voyage/${voyageId}/passager/${passagerId}?nombrePlaces=${nombrePlaces}`);
    console.log('With data:', reservationData);
    console.log('With headers:', this.getHeaders());

    return this.http.post<Reservation>(
      `${this.apiUrl}/api/reservations/voyage/${voyageId}/passager/${passagerId}?nombrePlaces=${nombrePlaces}`,
      {},
      { headers: this.getHeaders() }
    );
  }
  getHistoriqueReservations(idPassager: number): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.apiUrl}/historique/${idPassager}`);
  }
    rechercherVoyages(depart: string, destination: string, dateDepart: string): Observable<Voyage[]> {
    const params = new HttpParams()
      .set('depart', depart)
      .set('destination', destination)
      .set('dateDepart', dateDepart);

    return this.http.get<Voyage[]>(`${this.apiUrl}/api/voyages/recherche?depart=${depart}&destination=${destination}&dateDepart=${dateDepart}`,{
       headers: this.getHeaders()
  });
  }
  getReservationsByConductrice(conductriceId: number): Observable<Reservation[]> {
  return this.http.get<Reservation[]>(`${this.apiUrl}/api/reservations/conductrice/${conductriceId}`, {
    headers: this.getHeaders()
  });
  
}

  getReservationsOfVoyageByConductrice(conductriceId: number,voyageId: number): Observable<Reservation[]> {
  return this.http.get<Reservation[]>(`${this.apiUrl}/api/reservations/conductrice/${conductriceId}/voyage/${voyageId}`, {
    headers: this.getHeaders()
  });
  
}
updateStatutReservation(idReservation: number, nouveauStatut: string): Observable<Reservation> {
 return this.http.patch<Reservation>(
  `${this.apiUrl}/api/reservations/${idReservation}/statut/${nouveauStatut}`,
  {}, // Empty body or actual body if needed
  { headers: this.getHeaders() }
);

}

  
}
export { Reservation };