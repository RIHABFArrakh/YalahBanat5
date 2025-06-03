import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Evaluation {
  voyageId: number;
  passagerId: number;
  conductriceId: number;
  note: number;
  commentaire?: string;
}

@Injectable({ providedIn: 'root' })
export class EvaluationService {

  private apiUrl = 'http://localhost:8080/api/evaluations'; // à adapter

  constructor(private http: HttpClient) {}
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  ajouterEvaluation(data: any) {
    return this.http.post(this.apiUrl, data, {
      headers: this.getHeaders()
    });
  }
}