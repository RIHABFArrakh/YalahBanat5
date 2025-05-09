import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recherche',
  standalone: true,
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class RechercheComponent {
  form: FormGroup;
  minDateTime: string;
  showResults = false;

  trajets = [
    {
      villeDepart: 'Casablanca',
      villeDestination: 'Marrakech',
      date: 'ven. 10 mai',
      heure: '14:30',
      conducteur: 'Amina',
      initiale: 'A',
      note: 4.9,
      trajetsTotal: 27,
      places: '3/4',
      prix: '80 DH'
    },
    {
      villeDepart: 'Rabat',
      villeDestination: 'Fès',
      date: 'sam. 11 mai',
      heure: '09:00',
      conducteur: 'Khadija',
      initiale: 'K',
      note: 4.7,
      trajetsTotal: 18,
      places: '1/3',
      prix: '60 DH'
    },
    {
      villeDepart: 'Agadir',
      villeDestination: 'Essaouira',
      date: 'dim. 12 mai',
      heure: '16:45',
      conducteur: 'Hind',
      initiale: 'H',
      note: 4.6,
      trajetsTotal: 21,
      places: '2/3',
      prix: '70 DH'
    },
    {
      villeDepart: 'Tanger',
      villeDestination: 'Tétouan',
      date: 'lun. 13 mai',
      heure: '12:15',
      conducteur: 'Salma',
      initiale: 'S',
      note: 4.8,
      trajetsTotal: 30,
      places: '2/2',
      prix: '50 DH'
    }
  ];

  constructor(private fb: FormBuilder) {
    this.minDateTime = new Date().toISOString().slice(0, 16);

    this.form = this.fb.group({
      depart: ['', Validators.required],
      destination: ['', Validators.required],
      datetime: ['', Validators.required],
      passengers: [1, [Validators.required, Validators.min(1)]],
    });
  }

  increasePassengers() {
    const current = this.form.get('passengers')?.value || 1;
    this.form.get('passengers')?.setValue(current + 1);
  }

  decreasePassengers() {
    const current = this.form.get('passengers')?.value || 1;
    if (current > 1) {
      this.form.get('passengers')?.setValue(current - 1);
    }
  }

  submit() {
    if (this.form.valid) {
      console.log('Recherche validée :', this.form.value);
      this.showResults = true;
    } else {
      this.form.markAllAsTouched();
      this.showResults = false;
    }
  }
}
