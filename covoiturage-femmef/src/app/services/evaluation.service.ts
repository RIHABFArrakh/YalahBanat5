import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Evaluation {
  voyageId: number;
  passagerId: number;
  conductriceId: number;
  note: number;
  commentaire?: string;
}

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

  private apiUrl = 'http://localhost:8080/api/evaluations'; // change selon ton backend

  constructor(private http: HttpClient) { }

  createEvaluation(evaluation: Evaluation): Observable<any> {
    return this.http.post(this.apiUrl, evaluation);
  }
}
