import { Injectable } from '@angular/core';
import { environment } from '../../../environement/environement';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.apiUrl + '/auth';
  constructor(private http: HttpClient) {}

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
}
