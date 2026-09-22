import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';
import { Data } from '../../services/data';
import { User, BloodRequest } from '../../models/models';
import { NgIf, NgFor, DatePipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, NgIf, NgFor, DatePipe, TitleCasePipe],
  template: `
    <div class="dashboard-container section fade-in" *ngIf="user">
      <div class="container">
        <div class="dashboard-header">
          <div>
            <h2>Dashboard</h2>
            <p>Welcome back, <span class="text-primary">{{ user.name }}</span>!</p>
          </div>
          <div class="user-badge">
            <i class="fa-solid fa-user-circle fa-2x text-primary"></i>
            <div>
              <strong>{{ user.bloodGroup || 'Donor' }}</strong>
              <div style="font-size: 0.8rem; color: #666;">{{ user.city }}</div>
            </div>
          </div>
        </div>

        <!-- Dashboard Stats -->
        <div class="dashboard-stats">
          <div class="stat-card card">
            <div class="stat-icon-wrapper bg-red">
              <i class="fa-solid fa-users"></i>
            </div>
            <div class="stat-content">
              <h3>{{ totalDonors }}</h3>
              <p>Total Registered Donors</p>
            </div>
          </div>
          
          <div class="stat-card card">
            <div class="stat-icon-wrapper bg-blue">
              <i class="fa-solid fa-bed-pulse"></i>
            </div>
            <div class="stat-content">
              <h3>{{ activeRequests }}</h3>
              <p>Active Blood Requests</p>
            </div>
          </div>
          
          <div class="stat-card card">
            <div class="stat-icon-wrapper bg-green">
              <i class="fa-solid fa-truck-medical"></i>
            </div>
            <div class="stat-content">
              <h3>{{ activeRequests }}</h3>
              <p>Total Requests</p>
            </div>
          </div>
          
          <div class="stat-card card">
            <div class="stat-icon-wrapper bg-purple">
              <i class="fa-solid fa-heart-circle-check"></i>
            </div>
            <div class="stat-content">
              <h3>24</h3>
              <p>Successful Donations (Dummy)</p>
            </div>
          </div>
        </div>

        <!-- Dashboard Content Grid -->
        <div class="dashboard-grid">
          <!-- Quick Actions -->
          <div class="card action-card">
            <h3 class="card-title">Quick Actions</h3>
            <div class="action-buttons">
              <a routerLink="/request-blood" class="action-btn">
                <i class="fa-solid fa-truck-medical text-primary"></i>
                <span>Request Blood</span>
              </a>
              <a routerLink="/donors" class="action-btn">
                <i class="fa-solid fa-search text-primary"></i>
                <span>Find Donors</span>
              </a>
              <button (click)="auth.logout()" class="action-btn">
                <i class="fa-solid fa-right-from-bracket text-error"></i>
                <span class="text-error">Logout</span>
              </button>
            </div>
          </div>

          <!-- Messages -->
          <div class="card messages-card" style="grid-column: span 2;" *ngIf="user?.messages && user!.messages!.length > 0">
            <h3 class="card-title">Messages & Notifications</h3>
            <ul style="list-style: none; padding: 0; margin: 0;">
              <li *ngFor="let msg of user?.messages" style="padding: 15px 0; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <strong>{{ msg.fromName }} ({{ msg.fromBloodGroup }})</strong> sent a request on {{ msg.date | date:'short' }}:
                  <p style="margin: 5px 0 0; color: #555;">"{{ msg.message }}"</p>
                </div>
                <span class="badge" [class.badge-success]="msg.read" [class.badge-primary]="!msg.read">{{ msg.read ? 'Read' : 'New' }}</span>
              </li>
            </ul>
            <div class="text-right" style="margin-top: 15px; text-align: right;">
              <button class="btn btn-outline btn-sm" (click)="markMessagesRead()">Mark All as Read</button>
            </div>
          </div>

          <!-- Recent Requests Table -->
          <div class="card table-card" style="grid-column: span 2;">
            <h3 class="card-title">Recent Blood Requests</h3>
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th>Patient</th>
                    <th>Blood Group</th>
                    <th>Hospital</th>
                    <th>Date Needed</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let req of recentRequests">
                    <td>{{ req.patientName }}</td>
                    <td><span class="badge badge-primary">{{ req.bloodGroup }}</span></td>
                    <td>{{ req.hospital }}</td>
                    <td>{{ req.requiredDate | date }}</td>
                    <td>
                      <span class="badge" [class.badge-success]="req.status === 'fulfilled'"
                            [style.backgroundColor]="req.status === 'pending' ? '#fff3cd' : ''"
                            [style.color]="req.status === 'pending' ? '#856404' : ''">
                        {{ req.status | titlecase }}
                      </span>
                    </td>
                    <td>
                      <button class="btn btn-sm"
                              [class.btn-primary]="user?.bloodGroup === req.bloodGroup"
                              [class.btn-outline]="user?.bloodGroup !== req.bloodGroup"
                              [disabled]="user?.bloodGroup !== req.bloodGroup"
                              (click)="donate(req)">
                        Donate
                      </button>
                    </td>
                  </tr>
                  <tr *ngIf="recentRequests.length === 0">
                    <td colspan="6" class="text-center">No active requests found.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="text-center" style="margin-top: 15px;">
              <a routerLink="/request-blood" class="btn btn-outline">View All Requests</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
      padding-bottom: 20px;
      border-bottom: 1px solid #eee;
    }
    .user-badge {
      display: flex;
      align-items: center;
      gap: 15px;
      background: white;
      padding: 10px 20px;
      border-radius: 30px;
      box-shadow: var(--shadow);
    }
    .text-primary { color: var(--primary-color); }
    .text-error { color: var(--error); }
    
    .dashboard-stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }
    .stat-card {
      display: flex;
      align-items: center;
      padding: 20px;
      gap: 20px;
    }
    .stat-icon-wrapper {
      width: 60px;
      height: 60px;
      border-radius: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.8rem;
      color: white;
    }
    .bg-red { background: linear-gradient(135deg, #f44336, #e53935); }
    .bg-blue { background: linear-gradient(135deg, #2196F3, #1e88e5); }
    .bg-green { background: linear-gradient(135deg, #4CAF50, #43a047); }
    .bg-purple { background: linear-gradient(135deg, #9c27b0, #8e24aa); }
    .stat-content h3 { font-size: 1.8rem; margin: 0; color: #333; }
    .stat-content p { margin: 0; color: #777; font-size: 0.9rem; }
    
    .dashboard-grid {
      display: grid;
      grid-template-columns: 1fr 2fr;
      gap: 30px;
    }
    .card-title {
      font-size: 1.2rem;
      margin-bottom: 20px;
      color: var(--dark-gray);
      border-bottom: 1px solid #eee;
      padding-bottom: 10px;
    }
    
    .action-buttons {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
    }
    .action-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 20px;
      background: #f9f9f9;
      border-radius: 12px;
      text-decoration: none;
      color: var(--dark-gray);
      transition: var(--transition);
      border: 1px solid #eee;
      cursor: pointer;
      gap: 10px;
    }
    .action-btn i { font-size: 1.5rem; }
    .action-btn:hover {
      background: white;
      transform: translateY(-3px);
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
      border-color: var(--primary-color);
    }
    
    .btn-sm { padding: 6px 12px; font-size: 0.85rem; }
    
    @media (max-width: 992px) {
      .dashboard-grid { grid-template-columns: 1fr; }
      .table-card { grid-column: span 1 !important; }
    }
  `]
})
export class Dashboard implements OnInit {
  user: User | null = null;
  totalDonors = 0;
  activeRequests = 0;
  recentRequests: BloodRequest[] = [];

  constructor(public auth: Auth, private data: Data, private router: Router) {}

  ngOnInit() {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    
    this.user = this.auth.currentUser();
    this.totalDonors = this.auth.getUsers().length;
    
    const allRequests = this.data.bloodRequests();
    this.activeRequests = allRequests.filter(r => r.status === 'pending').length;
    this.recentRequests = allRequests.slice(0, 5); // Just taking first 5 for dummy display
    this.recentRequests = allRequests.slice(0, 5); // Just taking first 5 for dummy display
  }

  donate(req: BloodRequest) {
    alert(`Thank you for volunteering to donate blood to ${req.patientName}! The hospital will contact you shortly.`);
  }

  markMessagesRead() {
    if (this.user?.email) {
      this.auth.markMessagesRead(this.user.email);
      this.user = this.auth.currentUser();
    }
  }
}
