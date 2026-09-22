import { Component, OnInit } from '@angular/core';
import { Auth } from '../../services/auth';
import { User } from '../../models/models';
import { Router } from '@angular/router';
import { NgIf, NgFor, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-donor-list',
  standalone: true,
  imports: [NgIf, NgFor, UpperCasePipe, FormsModule],
  template: `
    <div class="container section fade-in">
      <div class="header-section text-center">
        <h2>Available Blood Donors</h2>
        <p>Find and connect with willing blood donors in your area.</p>
      </div>

      <div class="card controls-card">
        <div class="controls-wrapper">
          <div class="search-box">
            <i class="fa-solid fa-search"></i>
            <input type="text" class="form-control" placeholder="Search by city or name..." [(ngModel)]="searchTerm" (input)="filterDonors()">
          </div>
          
          <div class="filter-box">
            <select class="form-control" [(ngModel)]="selectedBloodGroup" (change)="filterDonors()">
              <option value="">All Blood Groups</option>
              <option *ngFor="let bg of bloodGroups" [value]="bg">{{bg}}</option>
            </select>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>Donor Name</th>
                <th>Blood Group</th>
                <th>City</th>
                <th>Age</th>
                <th>Contact</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let donor of filteredDonors">
                <td>
                  <div style="display: flex; align-items: center; gap: 10px;">
                    <div class="avatar">{{ donor.name.charAt(0) | uppercase }}</div>
                    <strong>{{ donor.name }}</strong>
                  </div>
                </td>
                <td>
                  <span class="badge badge-primary blood-badge">{{ donor.bloodGroup }}</span>
                </td>
                <td>{{ donor.city }}</td>
                <td>{{ donor.age }}</td>
                <td>
                  <button class="btn btn-outline btn-sm" (click)="showContact(donor)" *ngIf="!donor.showContact">
                    <i class="fa-solid fa-eye"></i> View
                  </button>
                  <span *ngIf="donor.showContact">{{ donor.phone }}</span>
                </td>
                <td>
                  <span class="badge badge-success">Available</span>
                </td>
                <td>
                  <button class="btn btn-primary btn-sm" (click)="requestDonor(donor)">Request</button>
                </td>
              </tr>
              <tr *ngIf="filteredDonors.length === 0">
                <td colspan="7" class="text-center" style="padding: 40px;">
                  <i class="fa-solid fa-user-slash fa-3x" style="color: #ccc; margin-bottom: 15px; display: block;"></i>
                  <p>No donors found matching your criteria.</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <!-- Pagination Dummy -->
        <div class="pagination" *ngIf="filteredDonors.length > 0">
          <button class="btn btn-outline btn-sm" disabled><i class="fa-solid fa-chevron-left"></i> Prev</button>
          <span class="page-info">Page 1 of 1</span>
          <button class="btn btn-outline btn-sm" disabled>Next <i class="fa-solid fa-chevron-right"></i></button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .header-section { margin-bottom: 40px; }
    .controls-card {
      margin-bottom: 30px;
      padding: 20px;
      background: #f9f9f9;
    }
    .controls-wrapper {
      display: flex;
      gap: 20px;
    }
    .search-box {
      flex: 2;
      position: relative;
    }
    .search-box i {
      position: absolute;
      left: 15px;
      top: 50%;
      transform: translateY(-50%);
      color: #888;
    }
    .search-box input { padding-left: 45px; }
    .filter-box { flex: 1; }
    
    .avatar {
      width: 35px;
      height: 35px;
      background: var(--primary-color);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
    }
    .blood-badge { font-size: 0.9rem; padding: 6px 12px; }
    .btn-sm { padding: 6px 12px; font-size: 0.85rem; }
    
    .pagination {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 15px;
      margin-top: 20px;
      padding-top: 20px;
      border-top: 1px solid #eee;
    }
    .page-info { color: #666; font-size: 0.9rem; }
    
    @media (max-width: 768px) {
      .controls-wrapper { flex-direction: column; }
    }
  `]
})
export class DonorList implements OnInit {
  allDonors: (User & {showContact?: boolean})[] = [];
  filteredDonors: (User & {showContact?: boolean})[] = [];
  
  searchTerm = '';
  selectedBloodGroup = '';
  bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  constructor(private auth: Auth, private router: Router) {}

  ngOnInit() {
    this.allDonors = this.auth.getUsers().filter(u => u.role === 'donor');
    
    // Add some dummy donors if none exist
    if (this.allDonors.length === 0) {
      this.allDonors = [
        { name: 'Alice Smith', bloodGroup: 'O+', city: 'New York', age: 28, phone: '555-0100', role: 'donor', email: 'a@b.com' },
        { name: 'Bob Johnson', bloodGroup: 'A-', city: 'Los Angeles', age: 34, phone: '555-0101', role: 'donor', email: 'b@b.com' },
        { name: 'Charlie Brown', bloodGroup: 'B+', city: 'Chicago', age: 41, phone: '555-0102', role: 'donor', email: 'c@b.com' },
        { name: 'Diana Prince', bloodGroup: 'O-', city: 'New York', age: 29, phone: '555-0103', role: 'donor', email: 'd@b.com' },
        { name: 'Ethan Hunt', bloodGroup: 'AB+', city: 'Miami', age: 38, phone: '555-0104', role: 'donor', email: 'e@b.com' },
      ];
    }
    
    this.filteredDonors = [...this.allDonors];
  }

  filterDonors() {
    this.filteredDonors = this.allDonors.filter(donor => {
      const matchSearch = donor.name.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
                          (donor.city && donor.city.toLowerCase().includes(this.searchTerm.toLowerCase()));
      const matchBg = this.selectedBloodGroup ? donor.bloodGroup === this.selectedBloodGroup : true;
      return matchSearch && matchBg;
    });
  }

  showContact(donor: any) {
    if (!this.auth.isLoggedIn()) {
      alert("Please login to view donor contact details.");
      this.router.navigate(['/login']);
      return;
    }
    donor.showContact = true;
  }

  requestDonor(donor: any) {
    if (!this.auth.isLoggedIn()) {
      alert("Please login to send a blood request to this donor.");
      this.router.navigate(['/login']);
      return;
    }
    
    const currentUser = this.auth.currentUser();
    if (currentUser) {
      const message = `Hello ${donor.name}, I am urgently looking for blood. Please contact me if you are available to donate.`;
      this.auth.sendMessage(donor.email, message, currentUser);
      alert(`A blood request has been sent to ${donor.name} (${donor.bloodGroup}). They will be notified shortly.`);
    }
  }
}
