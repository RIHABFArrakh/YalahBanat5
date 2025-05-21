import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Voyage {
  id: number;
  depart: string;
  destination: string;
  dateDepart: string;
  placesDisponibles: number;
  prix: number;
  conductriceId: number;
}

export interface VoyageDto {
  depart: string;
  destination: string;
  dateDepart: string;
  placesDisponibles: number;
  prix: number;
  conductriceId: number;
}

export interface VoyageDto2 {
  depart: string;
  destination: string;
  dateDepart: string;
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

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  private loadVoyages() {
    this.http.get<Voyage[]>(this.apiUrl, { headers: this.getHeaders() }).subscribe({
      next: (voyages) => {
        this.voyagesSubject.next(voyages);
      },
      error: (error) => {
        console.error('Error loading voyages:', error);
      }
    });
  }

  createVoyage(voyageDto: VoyageDto2): Observable<Voyage> {
    return this.http.post<Voyage>(this.apiUrl, voyageDto, { headers: this.getHeaders() });
  }

  getVoyages(): Observable<Voyage[]> {
    return this.voyages$;
  }

  getVoyageById(id: number): Observable<Voyage> {
    return this.http.get<Voyage>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  deleteVoyage(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  addVoyageToList(voyage: Voyage) {
    const currentVoyages = this.voyagesSubject.value;
    this.voyagesSubject.next([...currentVoyages, voyage]);
  }

  getVoyagesByConductrice(conductriceId: number): Observable<Voyage[]> {
    const headers = this.getHeaders();
    return this.http.get<Voyage[]>(`${this.apiUrl}/conductrice/${conductriceId}`, { headers });
  }


}