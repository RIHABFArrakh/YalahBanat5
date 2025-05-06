import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';

interface User {
  name: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-passager-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './passager-dashboard.component.html',
  styleUrl: './passager-dashboard.component.css'
})
export class PassagerDashboardComponent implements OnInit {
  userName: string = '';
  userRole: string = '';
  totalTrips: number = 0;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Get user data from AuthService
    this.authService.currentUser$.subscribe((user: User | null) => {
      if (user) {
        this.userName = user.name || '';
        this.userRole = user.role || '';
      }
    });
  }
}
