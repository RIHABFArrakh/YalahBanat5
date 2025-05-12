import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { VoyageService, Voyage, VoyageDto } from '../../../core/services/voyage.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-add-voyage',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-voyage.component.html',
})
export class AddVoyageComponent {
  form = this.fb.group({
    depart: ['', Validators.required],
    destination: ['', Validators.required],
    dateDepart: ['', Validators.required],
    placesDisponibles: [1, [Validators.required, Validators.min(1)]],
    price: [0, [Validators.required, Validators.min(0)]],
    conductriceId: [0, Validators.required]
  });

  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private voyageService: VoyageService,
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService
  ) {
    // Set the conductriceId from the current user
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.form.patchValue({
          conductriceId: user.id
        });
      }
    });
  }

  submit() {
    if (this.form.valid) {
      this.loading = true;
      const voyageData: VoyageDto = {
        depart: this.form.value.depart!,
        destination: this.form.value.destination!,
        dateHeure: this.form.value.dateDepart!,
        placesDisponibles: this.form.value.placesDisponibles!,
        price: this.form.value.price!,
        conductriceId: this.form.value.conductriceId!
      };
      
      this.voyageService.createVoyage(voyageData).subscribe({
        next: (res) => {
          this.loading = false;
          // Add the new voyage to the list
          this.voyageService.addVoyageToList(res);
          this.toastr.success('Voyage créé avec succès', 'Succès');
          this.router.navigate(['/conductrice/dashboard']);
        },
        error: (err) => {
          this.loading = false;
          this.toastr.error(err.error.message || 'Une erreur est survenue', 'Erreur');
        }
      });
    }
  }
}
