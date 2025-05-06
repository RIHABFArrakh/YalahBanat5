import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Reservation {
  id: number;
  voyage: {
    id: number;
    depart: string;
    destination: string;
    dateHeure: string;
    price: number;
  };
  passager: {
    id: number;
    name: string;
  };
  nombrePlaces: number;
  dateReservation: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = `${environment.apiUrl}/api/reservations`;
  private reservationsSubject = new BehaviorSubject<Reservation[]>([]);
  reservations$ = this.reservationsSubject.asObservable();

  constructor(private http: HttpClient) {}

  getReservationHistory(passagerId: number): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.apiUrl}/historique/${passagerId}`);
  }

  createReservation(voyageId: number, passagerId: number, nombrePlaces: number): Observable<Reservation> {
    return this.http.post<Reservation>(`${this.apiUrl}/voyage/${voyageId}/passager/${passagerId}`, null, {
      params: { nombrePlaces: nombrePlaces.toString() }
    });
  }

  updateReservationsList(reservations: Reservation[]) {
    this.reservationsSubject.next(reservations);
  }
}
