// reservation.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
// reservation.service.ts
import { Reservation } from '../models/reservation.model';

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
    return this.http.get<Reservation[]>(`${this.apiUrl}/api/reservations/history/${userId}`, {
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
  
  
}
export { Reservation };

