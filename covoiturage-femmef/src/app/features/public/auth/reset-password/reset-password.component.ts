import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent {
  form: FormGroup;
  token = '';
  success = '';
  error = '';
  loading = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    this.form = this.fb.group({
      newPassword: ['', Validators.required]
    });

    this.token = this.route.snapshot.queryParamMap.get('token') || '';
  }

  submit() {
    if (!this.token || this.form.invalid) return;
    this.loading=true;
    this.success='';
    this.error='';
    this.authService.resetPassword({ token: this.token, newPassword: this.form.value.newPassword }).subscribe({
      next: () => {
        this.loading=false;
        this.success = 'Mot de passe réinitialisé !';
        setTimeout(() => this.router.navigate(['/auth/login']), 3000);
      },
      error: (err) => {
        this.loading=false;
        this.error = err.error?.message || 'Échec de la réinitialisation'
      }
    });
  }
}
