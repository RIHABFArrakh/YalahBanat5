import { Injectable } from '@angular/core';
import { environment } from '../../../environement/environement';
import { HttpClient } from '@angular/common/http';
import { map, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.apiUrl + '/auth';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private userSubject = new BehaviorSubject<any>(null);

  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  currentUser$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {
    // Initialize auth state from localStorage
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const user = localStorage.getItem('user');
    
    this.isAuthenticatedSubject.next(!!token && !!role);
    if (user) {
      this.userSubject.next(JSON.parse(user));
    }
  }

  registerConductrice(payload: { name: string, email: string, password: string, voiture: string, numeroPermis: string }) {
    return this.http.post<any>(`${this.baseUrl}/register-conductrice`, payload);
  }

  registerPassager(payload: { email: string; password: string }) {
    return this.http.post<any>(`${this.baseUrl}/register-passager`, payload);
  }

  resetPassword(data: { token: string; newPassword: string }) {
    return this.http.post(`${this.baseUrl}/reset-password`, data);
  }

  requestPasswordReset(email: string) {
    return this.http.post(`${this.baseUrl}/forgot-password`, { email });
  }

  login(payload: { email: string; password: string }) {
    return this.http.post<any>(`${this.baseUrl}/login`, payload).pipe(
      map(response => {
        const token = response.data;
        localStorage.setItem('token', token);
        return response;
      })
    );
  }

  storeUserData(token: string, role: string, user: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    localStorage.setItem('user', JSON.stringify(user));
    this.isAuthenticatedSubject.next(true);
    this.userSubject.next(user);
  }

  getRoles(): string[] {
    const token = localStorage.getItem('token');
    if (!token) return [];
  
    const payload = token.split('.')[1];
    const decodedPayload = JSON.parse(atob(payload));
    return decodedPayload.roles || [];
  }
  
  isAdmin(): boolean {
    return this.getRoles().includes('Conductrice');
  }
  
  isUser(): boolean {
    return this.getRoles().includes('Passager');
  }

  logout() {
    localStorage.clear();
    this.isAuthenticatedSubject.next(false);
    this.userSubject.next(null);
  }
}
