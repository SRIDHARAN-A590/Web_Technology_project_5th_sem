import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterLink, NgIf],
  template: `
    <div class="hero-section fade-in">
      <div class="container hero-content">
        <div class="hero-text">
          <h1>Donate Blood,<br><span class="text-primary">Save Lives</span></h1>
          <p>Your blood donation can give a precious smile to someone's face. Join our community of heroes today.</p>
          <div class="hero-buttons">
            <ng-container *ngIf="!auth.isLoggedIn()">
              <a routerLink="/login" class="btn btn-primary">Login</a>
              <a routerLink="/register" class="btn btn-outline">Become a Donor</a>
            </ng-container>
            <ng-container *ngIf="auth.isLoggedIn()">
              <a routerLink="/dashboard" class="btn btn-primary">Go to Dashboard</a>
              <a routerLink="/request-blood" class="btn btn-outline">Request Blood</a>
            </ng-container>
          </div>
        </div>
        <div class="hero-image">
          <div class="blood-drop-wrapper">
            <i class="fa-solid fa-droplet blood-drop-animated"></i>
          </div>
        </div>
      </div>
    </div>

    <section class="section stats-section">
      <div class="container">
        <div class="stats-grid">
          <div class="stat-card card slide-up">
            <i class="fa-solid fa-users stat-icon"></i>
            <h3>5,000+</h3>
            <p>Registered Donors</p>
          </div>
          <div class="stat-card card slide-up" style="animation-delay: 0.1s;">
            <i class="fa-solid fa-heart-pulse stat-icon"></i>
            <h3>12,000+</h3>
            <p>Lives Saved</p>
          </div>
          <div class="stat-card card slide-up" style="animation-delay: 0.3s;">
            <i class="fa-solid fa-truck-medical stat-icon"></i>
            <h3>1,200+</h3>
            <p>Successful Requests</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section services-section bg-light">
      <div class="container">
        <h2 class="section-title">Our Services</h2>
        <div class="services-grid">
          <div class="card service-card">
            <div class="service-icon"><i class="fa-solid fa-magnifying-glass"></i></div>
            <h3>Find Blood</h3>
            <p>Quickly locate available blood groups from nearby donors and emergency posts.</p>
          </div>
          <div class="card service-card">
            <div class="service-icon"><i class="fa-solid fa-user-plus"></i></div>
            <h3>Become Donor</h3>
            <p>Register yourself as a blood donor and get notified when someone needs help.</p>
          </div>
          <div class="card service-card">
            <div class="service-icon"><i class="fa-solid fa-truck-medical"></i></div>
            <h3>Emergency Request</h3>
            <p>Post emergency blood requests and notify nearby registered donors instantly.</p>
          </div>
          <div class="card service-card">
            <div class="service-icon"><i class="fa-solid fa-campground"></i></div>
            <h3>Blood Camps</h3>
            <p>Find and participate in upcoming blood donation camps in your city.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section about-section">
      <div class="container about-content">
        <div class="about-image card">
          <img src="https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=800&q=80" alt="Blood Donation" style="width: 100%; border-radius: 8px;">
        </div>
        <div class="about-text">
          <h2 class="section-title" style="text-align: left;">Why Donate Blood?</h2>
          <p>Blood donation is a voluntary procedure that can help save lives. There are several types of blood donation. Each type helps meet different medical needs.</p>
          <ul>
            <li><i class="fa-solid fa-check text-primary"></i> One donation can save up to three lives</li>
            <li><i class="fa-solid fa-check text-primary"></i> Free health screening</li>
            <li><i class="fa-solid fa-check text-primary"></i> Reduces risk of heart disease</li>
            <li><i class="fa-solid fa-check text-primary"></i> Burns calories</li>
          </ul>
          <a routerLink="/contact" class="btn btn-primary" style="margin-top: 20px;">Learn More</a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero-section {
      min-height: 80vh;
      display: flex;
      align-items: center;
      background: linear-gradient(135deg, #fff 0%, #ffebee 100%);
      padding: 60px 0;
    }
    .hero-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 40px;
    }
    .hero-text {
      flex: 1;
    }
    .hero-text h1 {
      font-size: 3.5rem;
      font-weight: 800;
      line-height: 1.2;
      margin-bottom: 20px;
    }
    .text-primary { color: var(--primary-color); }
    .hero-text p {
      font-size: 1.2rem;
      margin-bottom: 30px;
      color: #555;
    }
    .hero-buttons {
      display: flex;
      gap: 15px;
    }
    .hero-image {
      flex: 1;
      display: flex;
      justify-content: center;
    }
    .blood-drop-wrapper {
      width: 300px;
      height: 300px;
      background: rgba(211, 47, 47, 0.1);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 0 40px rgba(211, 47, 47, 0.2);
    }
    .blood-drop-animated {
      font-size: 150px;
      color: var(--primary-color);
      animation: pulse 2s infinite;
    }
    @keyframes pulse {
      0% { transform: scale(0.95); opacity: 0.8; }
      50% { transform: scale(1.05); opacity: 1; }
      100% { transform: scale(0.95); opacity: 0.8; }
    }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 30px;
      margin-top: -80px;
      position: relative;
      z-index: 10;
    }
    .stat-card {
      text-align: center;
      padding: 40px 20px;
    }
    .stat-icon {
      font-size: 3rem;
      color: var(--primary-color);
      margin-bottom: 15px;
    }
    .stat-card h3 {
      font-size: 2rem;
      margin-bottom: 5px;
      color: var(--dark-gray);
    }
    .services-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 30px;
    }
    .service-card {
      text-align: center;
      padding: 40px 30px;
    }
    .service-icon {
      width: 70px;
      height: 70px;
      background: rgba(211, 47, 47, 0.1);
      color: var(--primary-color);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.8rem;
      margin: 0 auto 20px;
      transition: var(--transition);
    }
    .service-card:hover .service-icon {
      background: var(--primary-color);
      color: white;
      transform: scale(1.1);
    }
    .bg-light { background-color: #f9f9f9; }
    .about-content {
      display: flex;
      align-items: center;
      gap: 50px;
    }
    .about-image { flex: 1; padding: 10px; }
    .about-text { flex: 1; }
    .about-text ul {
      list-style: none;
      margin-top: 20px;
    }
    .about-text li {
      margin-bottom: 15px;
      font-size: 1.1rem;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    @media (max-width: 768px) {
      .hero-content { flex-direction: column; text-align: center; }
      .hero-buttons { justify-content: center; }
      .about-content { flex-direction: column; }
      .stats-grid { margin-top: 0; }
    }
  `]
})
export class Landing {
  constructor(public auth: Auth) {}
}
