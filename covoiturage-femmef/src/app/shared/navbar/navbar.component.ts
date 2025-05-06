import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, style, transition, animate } from '@angular/animations';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [
    trigger('menuAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({ opacity: 0, transform: 'translateY(-10px)' }))
      ])
    ])
  ]
})
export class NavbarComponent implements OnInit, OnDestroy {
  isMenuOpen = false;
  isProfileMenuOpen = false;
  isLoggedIn = false;
  userName = '';
  private authSubscription: Subscription | null = null;
  private userSubscription: Subscription | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Subscribe to authentication state changes
    this.authSubscription = this.authService.isAuthenticated$.subscribe(
      isAuthenticated => {
        this.isLoggedIn = isAuthenticated;
      }
    );

    // Subscribe to user data changes
    this.userSubscription = this.authService.currentUser$.subscribe(
      user => {
        if (user) {
          this.userName = user.name || '';
        } else {
          this.userName = '';
        }
      }
    );
  }

  ngOnDestroy() {
    // Clean up subscriptions
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleProfileMenu() {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }

  logout() {
    this.authService.logout();
    window.location.href = '/';
  }
}
