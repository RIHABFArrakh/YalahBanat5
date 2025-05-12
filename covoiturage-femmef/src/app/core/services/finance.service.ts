// src/app/services/finance.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',  // Cela rend ce service disponible globalement
})
export class FinanceService {
  private baseUrl = 'http://localhost:8080/api/finances';  // Remplace par l'URL de ton API backend

  constructor(private http: HttpClient) {}
 private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
  // Méthode pour récupérer le total des finances pour une conductrice donnée
  getTotalByConductriceId(id: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/total/${id}`,{ headers: this.getHeaders() });
  }
}
