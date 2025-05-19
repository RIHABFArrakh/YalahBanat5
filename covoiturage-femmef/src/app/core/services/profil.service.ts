import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Passager } from '../models/passager.model';
import { Conductrice } from '../models/conductrice.model';

@Injectable({
  providedIn: 'root'
})
export class ProfilService {
  private apiUrl = 'http://votre-backend-api-url/user'; // L'URL de l'API pour obtenir les profils

  constructor(private http: HttpClient) {}

  getPassagerByUserId(userId: number): Observable<Passager> {
    return this.http.get<Passager>(`${this.apiUrl}/passager/${userId}`);
  }

  getConductriceByUserId(userId: number): Observable<Conductrice> {
    return this.http.get<Conductrice>(`${this.apiUrl}/conductrice/${userId}`);
  }
}
