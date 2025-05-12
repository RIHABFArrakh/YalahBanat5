import { Injectable } from '@angular/core';
import { environment } from '../../../environement/environement';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.apiUrl + '/auth';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private userSubject = new BehaviorSubject<User | null>(null);
  
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  currentUser$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    this.isAuthenticatedSubject.next(!!token);
    if (user) {
      this.userSubject.next(JSON.parse(user));
    }
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Une erreur est survenue';
    
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erreur: ${error.error.message}`;
    } else {
      if (error.status === 401) {
        errorMessage = 'Email ou mot de passe incorrect';
      } else if (error.status === 403) {
        errorMessage = 'Accès refusé';
      } else {
        errorMessage = error.error?.message || `Erreur ${error.status}`;
      }
    }
    
    return throwError(() => new Error(errorMessage));
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, credentials).pipe(
      tap(response => {
        if (response.token && response.user) {
          this.storeUserData(response.token, response.user.role, response.user);
        }
      }),
      catchError(this.handleError)
    );
  }

  registerConductrice(payload: { name: string, email: string, password: string, voiture: string, numeroPermis: string }) {
    return this.http.post<any>(`${this.baseUrl}/register-conductrice`, payload)
      .pipe(catchError(this.handleError));
  }

  registerPassager(payload: { email: string; password: string }) {
    return this.http.post<any>(`${this.baseUrl}/register-passager`, payload)
      .pipe(catchError(this.handleError));
  }

  requestPasswordReset(email: string) {
    return this.http.post(`${this.baseUrl}/forgot-password`, { email })
      .pipe(catchError(this.handleError));
  }

  resetPassword(data: { token: string; newPassword: string }) {
    return this.http.post(`${this.baseUrl}/reset-password`, data)
      .pipe(catchError(this.handleError));
  }

  storeUserData(token: string, role: string, user: User) {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    localStorage.setItem('user', JSON.stringify(user));
    this.isAuthenticatedSubject.next(true);
    this.userSubject.next(user);
  }

  logout() {
    localStorage.clear();
    this.isAuthenticatedSubject.next(false);
    this.userSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  getCurrentUser(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}
