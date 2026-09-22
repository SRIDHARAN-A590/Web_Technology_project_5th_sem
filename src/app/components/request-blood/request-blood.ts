import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { Data } from '../../services/data';

@Component({
  selector: 'app-request-blood',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor],
  template: `
    <div class="container section fade-in">
      <div class="request-card card">
        <div class="text-center">
          <div class="icon-wrapper">
            <i class="fa-solid fa-truck-medical"></i>
          </div>
          <h2>Emergency Blood Request</h2>
          <p>Fill out the form below to broadcast an emergency blood request to nearby donors.</p>
        </div>

        <div *ngIf="successMsg" class="alert alert-success">{{ successMsg }}</div>

        <form [formGroup]="requestForm" (ngSubmit)="onSubmit()" class="request-form">
          <div class="form-row">
            <div class="form-group half-width">
              <label class="form-label">Patient Name</label>
              <input type="text" class="form-control" formControlName="patientName"
                     [class.is-invalid]="f['patientName'].invalid && (f['patientName'].dirty || f['patientName'].touched)">
              <div *ngIf="f['patientName'].invalid && (f['patientName'].dirty || f['patientName'].touched)" class="error-message">
                Patient name is required
              </div>
            </div>
            
            <div class="form-group half-width">
              <label class="form-label">Blood Group Required</label>
              <select class="form-control" formControlName="bloodGroup"
                      [class.is-invalid]="f['bloodGroup'].invalid && (f['bloodGroup'].dirty || f['bloodGroup'].touched)">
                <option value="">Select Blood Group</option>
                <option *ngFor="let bg of bloodGroups" [value]="bg">{{bg}}</option>
              </select>
              <div *ngIf="f['bloodGroup'].invalid && (f['bloodGroup'].dirty || f['bloodGroup'].touched)" class="error-message">
                Blood group is required
              </div>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group half-width">
              <label class="form-label">Hospital Name</label>
              <input type="text" class="form-control" formControlName="hospital"
                     [class.is-invalid]="f['hospital'].invalid && (f['hospital'].dirty || f['hospital'].touched)">
              <div *ngIf="f['hospital'].invalid && (f['hospital'].dirty || f['hospital'].touched)" class="error-message">
                Hospital name is required
              </div>
            </div>
            
            <div class="form-group half-width">
              <label class="form-label">Units Required (Pints)</label>
              <input type="number" class="form-control" formControlName="unitsRequired"
                     [class.is-invalid]="f['unitsRequired'].invalid && (f['unitsRequired'].dirty || f['unitsRequired'].touched)">
              <div *ngIf="f['unitsRequired'].invalid && (f['unitsRequired'].dirty || f['unitsRequired'].touched)" class="error-message">
                <span *ngIf="f['unitsRequired'].errors?.['required']">Units required is mandatory</span>
                <span *ngIf="f['unitsRequired'].errors?.['min']">Minimum 1 unit required</span>
              </div>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group half-width">
              <label class="form-label">Contact Number</label>
              <input type="text" class="form-control" formControlName="contactNumber"
                     [class.is-invalid]="f['contactNumber'].invalid && (f['contactNumber'].dirty || f['contactNumber'].touched)"
                     placeholder="10 digit number">
              <div *ngIf="f['contactNumber'].invalid && (f['contactNumber'].dirty || f['contactNumber'].touched)" class="error-message">
                <span *ngIf="f['contactNumber'].errors?.['required']">Contact number is required</span>
                <span *ngIf="f['contactNumber'].errors?.['pattern']">Valid 10-digit number required</span>
              </div>
            </div>
            
            <div class="form-group half-width">
              <label class="form-label">Date Required</label>
              <input type="date" class="form-control" formControlName="requiredDate"
                     [class.is-invalid]="f['requiredDate'].invalid && (f['requiredDate'].dirty || f['requiredDate'].touched)">
              <div *ngIf="f['requiredDate'].invalid && (f['requiredDate'].dirty || f['requiredDate'].touched)" class="error-message">
                Required date is mandatory
              </div>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Hospital Address</label>
            <textarea class="form-control" rows="2" formControlName="hospitalAddress"
                      [class.is-invalid]="f['hospitalAddress'].invalid && (f['hospitalAddress'].dirty || f['hospitalAddress'].touched)"></textarea>
            <div *ngIf="f['hospitalAddress'].invalid && (f['hospitalAddress'].dirty || f['hospitalAddress'].touched)" class="error-message">
              Hospital address is required
            </div>
          </div>
          
          <div class="form-group">
            <label class="form-label">Reason / Medical Condition</label>
            <textarea class="form-control" rows="3" formControlName="reason"
                      [class.is-invalid]="f['reason'].invalid && (f['reason'].dirty || f['reason'].touched)"></textarea>
            <div *ngIf="f['reason'].invalid && (f['reason'].dirty || f['reason'].touched)" class="error-message">
              Reason is required
            </div>
          </div>

          <div class="text-center" style="margin-top: 30px;">
            <button type="submit" class="btn btn-primary btn-submit" [disabled]="requestForm.invalid || isLoading">
              <span *ngIf="!isLoading">Submit Request</span>
              <span *ngIf="isLoading"><i class="fa-solid fa-spinner fa-spin"></i> Submitting...</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .request-card { max-width: 800px; margin: 0 auto; padding: 40px; }
    .icon-wrapper {
      width: 80px;
      height: 80px;
      background: rgba(211, 47, 47, 0.1);
      color: var(--primary-color);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      margin: 0 auto 20px;
    }
    .request-form { margin-top: 30px; }
    .form-row { display: flex; flex-wrap: wrap; margin: 0 -10px; }
    .half-width { width: 50%; padding: 0 10px; }
    .alert { padding: 15px; border-radius: 8px; margin-bottom: 20px; text-align: center; }
    .alert-success { background: #e8f5e9; color: var(--success); border: 1px solid #c8e6c9; }
    .btn-submit { width: 250px; padding: 14px; font-size: 1.1rem; }
    textarea { resize: vertical; }
    
    @media (max-width: 768px) {
      .half-width { width: 100%; }
      .request-card { padding: 20px; }
    }
  `]
})
export class RequestBlood {
  requestForm: FormGroup;
  isLoading = false;
  successMsg = '';
  bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  constructor(private fb: FormBuilder, private data: Data, private router: Router) {
    this.requestForm = this.fb.group({
      patientName: ['', Validators.required],
      hospital: ['', Validators.required],
      bloodGroup: ['', Validators.required],
      unitsRequired: ['', [Validators.required, Validators.min(1)]],
      contactNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      requiredDate: ['', Validators.required],
      hospitalAddress: ['', Validators.required],
      reason: ['', Validators.required]
    });
  }

  get f() { return this.requestForm.controls; }

  onSubmit() {
    if (this.requestForm.invalid) return;
    
    this.isLoading = true;
    
    setTimeout(() => {
      this.data.addRequest(this.requestForm.value);
      this.isLoading = false;
      this.successMsg = 'Emergency blood request has been posted successfully!';
      this.requestForm.reset();
      
      setTimeout(() => {
        this.successMsg = '';
        this.router.navigate(['/dashboard']);
      }, 3000);
    }, 1500);
  }
}
