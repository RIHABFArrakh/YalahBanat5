import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/api`;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Une erreur est survenue';
    
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erreur: ${error.error.message}`;
    } else {
      errorMessage = error.error?.message || `Erreur ${error.status}`;
    }
    return throwError(() => new Error(errorMessage));
  }

  login(credentials: { email: string; password: string }): Observable<any> {  
    return this.http.post(`${this.apiUrl}/auth/login`, credentials);
  }

  getDashboardData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/me`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  getConductriceByUserId(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/conductrices/user/${userId}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  getPassagerByUserId(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/passagers/user/${userId}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }
}
