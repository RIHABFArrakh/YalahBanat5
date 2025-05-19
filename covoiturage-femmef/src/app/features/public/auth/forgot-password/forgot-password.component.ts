import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  email = '';

  constructor(private authService: AuthService) {}

  onSubmit() {
    if (!this.email) return;
    this.authService.requestPasswordReset(this.email).subscribe({
      next: () => alert('Consultez votre email pour les instructions.'),
      error: err => alert('Erreur : ' + (err.message || 'Une erreur est survenue'))
    });
  }
}
