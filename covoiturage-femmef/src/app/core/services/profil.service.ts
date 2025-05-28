import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Passager } from '../models/passager.model';
import { Conductrice } from '../models/conductrice.model';
import { UserProfileDTO } from '../../dto/user-profile.dto';

@Injectable({
  providedIn: 'root'
})
export class ProfilService {
  private apiUrl = 'http://localhost:8080/api/users'; // Use the correct base path from backend UserController

  constructor(private http: HttpClient) {}

    private getHeaders(): HttpHeaders {
      const token = localStorage.getItem('token');
      return new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
    }

  getCurrentUserProfile(): Observable<UserProfileDTO> {
    return this.http.get<UserProfileDTO>(`${this.apiUrl}/me`, {
    headers: this.getHeaders()
  });
  }
  
  updateProfile(dto: any): Observable<any> {
  return this.http.put(`${this.apiUrl}/me`, dto, {
    headers: this.getHeaders()
  });
}

}
