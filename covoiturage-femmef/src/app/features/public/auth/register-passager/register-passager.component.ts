import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-passager',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register-passager.component.html',
  styleUrls: ['./register-passager.component.css']
})
export class RegisterPassagereComponent implements OnInit {
  form!: FormGroup;
  error: string = '';
  success: string = '';
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      adresse: ['', Validators.required]
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.error = 'Veuillez remplir tous les champs correctement.';
      return;
    }

    this.loading = true;
    this.success = '';
    this.error = '';

    this.authService.registerPassager(this.form.value).subscribe({
      next: (res) => {
        this.loading = false;
        this.success = 'Inscription réussie ! Vérifiez votre email.';
        // Optionally: redirect to login
        // this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.message || 'Échec de l inscription';
      }
    });
  }
}