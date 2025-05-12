import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService, User } from '../../../../core/services/auth.service';
import { UserService } from '../../../../core/services/user.service';

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
    private userService: UserService,
    private router: Router
  ) {}

  onSubmit() {
    this.authService.login({ email: this.email, password: this.password })
      .subscribe({
        next: (response: any) => {
          if (response.data) {
            const token = response.data;
            const payload = JSON.parse(atob(token.split('.')[1]));
            const role = payload.roles[0].replace('ROLE_', '').toLowerCase();
            
            const user: User = {
              id: payload.userId,
              name: payload.name,
              email: payload.sub,
              role: role
            };
            
            this.authService.storeUserData(token, role, user);
            
            if (role === 'conductrice') {
              this.userService.getConductriceByUserId(payload.userId).subscribe(conductrice => {
                localStorage.setItem('conductriceId', conductrice.id);
                this.router.navigate(['/dashboard-conductrice']);
              });
              
            
            } else if (role === 'passager') {
              this.userService.getPassagerByUserId(payload.userId).subscribe(passager => {
                localStorage.setItem('passagerId', passager.id);
                this.router.navigate(['/passager/dashboard']);
              });
      
            }
          }
        },   
        error: (error: any) => {
          this.errorMessage = 'Email ou mot de passe incorrect';
          console.error('Login error:', error);
        }
      });
  }
}