import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Voyage {
  id?: number;
  depart: string;
  destination: string;
  dateHeure: string;
  placesDisponibles: number;
  price: number;
  conductriceId: number;
}

@Injectable({
  providedIn: 'root'
})
export class VoyageService {
  private apiUrl = `${environment.apiUrl}/api/voyages`;
  private voyagesSubject = new BehaviorSubject<Voyage[]>([]);
  voyages$ = this.voyagesSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadVoyages();
  }

  private loadVoyages() {
    this.http.get<Voyage[]>(this.apiUrl).subscribe({
      next: (voyages) => {
        this.voyagesSubject.next(voyages);
      },
      error: (error) => {
        console.error('Error loading voyages:', error);
      }
    });
  }

  createVoyage(voyage: Voyage): Observable<Voyage> {
    return this.http.post<Voyage>(this.apiUrl, voyage);
  }

  getVoyages(): Observable<Voyage[]> {
    return this.voyages$;
  }

  getVoyageById(id: number): Observable<Voyage> {
    return this.http.get<Voyage>(`${this.apiUrl}/${id}`);
  }

  deleteVoyage(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  addVoyageToList(voyage: Voyage) {
    const currentVoyages = this.voyagesSubject.value;
    this.voyagesSubject.next([...currentVoyages, voyage]);
  }
}
