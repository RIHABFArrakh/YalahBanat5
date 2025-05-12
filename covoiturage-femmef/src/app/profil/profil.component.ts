import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: any;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Récupérer les données de la conductrice une fois le composant chargé
    this.user = this.authService.getCurrentUser();
  }
}
