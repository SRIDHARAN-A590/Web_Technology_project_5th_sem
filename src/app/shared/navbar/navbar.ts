import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Auth } from '../../services/auth';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf],
  template: `
    <nav class="navbar">
      <div class="container nav-container">
        <a routerLink="/" class="logo">
          <i class="fa-solid fa-droplet text-primary"></i> LifeBlood
        </a>
        
        <div class="menu-toggle" (click)="toggleMenu()">
          <i class="fa-solid fa-bars"></i>
        </div>

        <ul class="nav-menu" [class.active]="isMenuOpen">
          <li><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Home</a></li>
          <li><a routerLink="/donors" routerLinkActive="active">Donors</a></li>
          <li><a routerLink="/request-blood" routerLinkActive="active">Request Blood</a></li>
          <li><a routerLink="/contact" routerLinkActive="active">Contact</a></li>
          
          <ng-container *ngIf="!auth.isLoggedIn()">
            <!-- Login and Register removed from navbar -->
          </ng-container>
          
          <ng-container *ngIf="auth.isLoggedIn()">
            <li><a routerLink="/dashboard" class="nav-link" routerLinkActive="active">Dashboard</a></li>
            <li><a (click)="logout()" class="btn btn-outline btn-sm" style="margin-left: 10px; cursor: pointer;">Logout</a></li>
          </ng-container>
        </ul>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      background: var(--white);
      box-shadow: var(--shadow);
      position: sticky;
      top: 0;
      z-index: 1000;
      padding: 15px 0;
    }
    .nav-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .logo {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--dark-gray);
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .text-primary {
      color: var(--primary-color);
    }
    .nav-menu {
      display: flex;
      list-style: none;
      gap: 20px;
      align-items: center;
    }
    .nav-menu a {
      text-decoration: none;
      color: var(--dark-gray);
      font-weight: 500;
      transition: var(--transition);
      cursor: pointer;
    }
    .nav-menu a:hover, .nav-menu a.active {
      color: var(--primary-color);
    }
    .btn-sm {
      padding: 8px 16px;
      font-size: 0.9rem;
    }
    .menu-toggle {
      display: none;
      font-size: 1.5rem;
      cursor: pointer;
    }
    .logout-btn {
      cursor: pointer;
    }
    @media (max-width: 768px) {
      .menu-toggle { display: block; }
      .nav-menu {
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: var(--white);
        flex-direction: column;
        padding: 20px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        display: none;
      }
      .nav-menu.active { display: flex; }
    }
  `]
})
export class Navbar {
  isMenuOpen = false;

  constructor(public auth: Auth) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
    this.auth.logout();
    this.isMenuOpen = false;
  }
}
