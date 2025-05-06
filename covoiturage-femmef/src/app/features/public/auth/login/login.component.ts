import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

interface LoginResponse {
  data: string;
  message: string;
  status: number;
  user?: {
    name: string;
    email: string;
    role: string;
  };
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';
  emailError: string = '';
  passwordError: string = '';
  rememberMe: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    this.authService.login({ email: this.email, password: this.password })
      .subscribe({
        next: (response: LoginResponse) => {
          // Get the role from the token
          const token = response.data;
          const payload = JSON.parse(atob(token.split('.')[1]));
          const role = payload.roles[0].replace('ROLE_', '').toLowerCase();
          
          // Store user data
          this.authService.storeUserData(token, role, {
            name: response.user?.name || this.email.split('@')[0],
            email: this.email,
            role: role
          });
          
          // Redirect based on role
          if (role === 'conductrice') {
            this.router.navigate(['/dashboard-conductrice']);
          } else if (role === 'passager') {
            this.router.navigate(['/passager/dashboard']);
          }
        },
        error: (error: any) => {
          this.errorMessage = 'Email ou mot de passe incorrect';
          console.error('Login error:', error);
        }
      });
  }
}