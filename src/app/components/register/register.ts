import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { Auth } from '../../services/auth';
import { User } from '../../models/models';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgIf, NgFor],
  template: `
    <div class="container section fade-in">
      <div class="register-card card">
        <div class="text-center">
          <h2>Donor Registration</h2>
          <p>Join our community and help save lives today.</p>
        </div>
        
        <div *ngIf="errorMsg" class="alert alert-error">{{ errorMsg }}</div>
        <div *ngIf="successMsg" class="alert alert-success">{{ successMsg }}</div>

        <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="register-form">
          <!-- Personal Info -->
          <h4 class="form-section-title">Personal Information</h4>
          <div class="form-row">
            <div class="form-group half-width">
              <label class="form-label">Full Name</label>
              <input type="text" class="form-control" formControlName="name"
                     [class.is-invalid]="f['name'].invalid && (f['name'].dirty || f['name'].touched)">
              <div *ngIf="f['name'].invalid && (f['name'].dirty || f['name'].touched)" class="error-message">
                Name is required
              </div>
            </div>
            
            <div class="form-group half-width">
              <label class="form-label">Email Address</label>
              <input type="email" class="form-control" formControlName="email"
                     [class.is-invalid]="f['email'].invalid && (f['email'].dirty || f['email'].touched)">
              <div *ngIf="f['email'].invalid && (f['email'].dirty || f['email'].touched)" class="error-message">
                <span *ngIf="f['email'].errors?.['required']">Email is required</span>
                <span *ngIf="f['email'].errors?.['email'] || f['email'].errors?.['pattern']">Must be a valid @gmail.com address</span>
              </div>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group half-width">
              <label class="form-label">Mobile Number</label>
              <input type="text" class="form-control" formControlName="phone"
                     [class.is-invalid]="f['phone'].invalid && (f['phone'].dirty || f['phone'].touched)">
              <div *ngIf="f['phone'].invalid && (f['phone'].dirty || f['phone'].touched)" class="error-message">
                <span *ngIf="f['phone'].errors?.['required']">Phone number is required</span>
                <span *ngIf="f['phone'].errors?.['pattern']">Must be a valid 10-digit number</span>
              </div>
            </div>
            
            <div class="form-group half-width">
              <label class="form-label">Gender</label>
              <select class="form-control" formControlName="gender"
                      [class.is-invalid]="f['gender'].invalid && (f['gender'].dirty || f['gender'].touched)">
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <div *ngIf="f['gender'].invalid && (f['gender'].dirty || f['gender'].touched)" class="error-message">
                Gender is required
              </div>
            </div>
          </div>

          <!-- Medical Info -->
          <h4 class="form-section-title">Medical Details</h4>
          <div class="form-row">
            <div class="form-group third-width">
              <label class="form-label">Blood Group</label>
              <select class="form-control" formControlName="bloodGroup"
                      [class.is-invalid]="f['bloodGroup'].invalid && (f['bloodGroup'].dirty || f['bloodGroup'].touched)">
                <option value="">Select Group</option>
                <option *ngFor="let bg of bloodGroups" [value]="bg">{{bg}}</option>
              </select>
              <div *ngIf="f['bloodGroup'].invalid && (f['bloodGroup'].dirty || f['bloodGroup'].touched)" class="error-message">
                Blood Group is required
              </div>
            </div>
            
            <div class="form-group third-width">
              <label class="form-label">Age (Years)</label>
              <input type="number" class="form-control" formControlName="age"
                     [class.is-invalid]="f['age'].invalid && (f['age'].dirty || f['age'].touched)">
              <div *ngIf="f['age'].invalid && (f['age'].dirty || f['age'].touched)" class="error-message">
                <span *ngIf="f['age'].errors?.['required']">Age is required</span>
                <span *ngIf="f['age'].errors?.['min'] || f['age'].errors?.['max']">Age must be between 18 and 60</span>
              </div>
            </div>
            
            <div class="form-group third-width">
              <label class="form-label">Weight (Kg)</label>
              <input type="number" class="form-control" formControlName="weight"
                     [class.is-invalid]="f['weight'].invalid && (f['weight'].dirty || f['weight'].touched)">
              <div *ngIf="f['weight'].invalid && (f['weight'].dirty || f['weight'].touched)" class="error-message">
                <span *ngIf="f['weight'].errors?.['required']">Weight is required</span>
                <span *ngIf="f['weight'].errors?.['min']">Minimum weight is 50kg</span>
              </div>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group half-width">
              <label class="form-label">City</label>
              <input type="text" class="form-control" formControlName="city"
                     [class.is-invalid]="f['city'].invalid && (f['city'].dirty || f['city'].touched)">
              <div *ngIf="f['city'].invalid && (f['city'].dirty || f['city'].touched)" class="error-message">
                City is required
              </div>
            </div>
            
            <div class="form-group half-width">
              <label class="form-label">Last Donation Date (Optional)</label>
              <input type="date" class="form-control" formControlName="lastDonationDate">
            </div>
          </div>

          <!-- Account Security -->
          <h4 class="form-section-title">Account Security</h4>
          <div class="form-row">
            <div class="form-group half-width">
              <label class="form-label">Password</label>
              <input type="password" class="form-control" formControlName="password"
                     [class.is-invalid]="f['password'].invalid && (f['password'].dirty || f['password'].touched)">
              <div *ngIf="f['password'].invalid && (f['password'].dirty || f['password'].touched)" class="error-message">
                <span *ngIf="f['password'].errors?.['required']">Password is required<br></span>
                <span *ngIf="f['password'].errors?.['minlength']">Minimum 8 characters<br></span>
                <span *ngIf="f['password'].errors?.['pattern']">Must contain uppercase, lowercase, number, special char</span>
              </div>
            </div>
            
            <div class="form-group half-width">
              <label class="form-label">Confirm Password</label>
              <input type="password" class="form-control" formControlName="confirmPassword"
                     [class.is-invalid]="registerForm.errors?.['passwordMismatch'] && (f['confirmPassword'].dirty || f['confirmPassword'].touched)">
              <div *ngIf="registerForm.errors?.['passwordMismatch'] && (f['confirmPassword'].dirty || f['confirmPassword'].touched)" class="error-message">
                Passwords do not match
              </div>
            </div>
          </div>

          <div class="form-group" style="margin-top: 20px;">
            <label class="checkbox-container">
              <input type="checkbox" formControlName="terms"> I agree to the terms and conditions and certify that the information provided is correct.
            </label>
            <div *ngIf="f['terms'].invalid && (f['terms'].dirty || f['terms'].touched)" class="error-message">
              You must agree to the terms
            </div>
          </div>

          <div class="form-actions text-center">
            <button type="submit" class="btn btn-primary" [disabled]="registerForm.invalid" style="width: 200px;">
              Register as Donor
            </button>
            <p style="margin-top: 20px;">Already registered? <a routerLink="/login" style="color: var(--primary-color);">Login here</a></p>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .register-card { max-width: 800px; margin: 0 auto; padding: 40px; }
    .register-form { margin-top: 30px; }
    .form-section-title {
      border-bottom: 2px solid #eee;
      padding-bottom: 10px;
      margin: 30px 0 20px;
      color: var(--primary-color);
    }
    .form-section-title:first-child { margin-top: 0; }
    .form-row {
      display: flex;
      flex-wrap: wrap;
      margin: 0 -10px;
    }
    .half-width { width: 50%; padding: 0 10px; }
    .third-width { width: 33.33%; padding: 0 10px; }
    
    .alert { padding: 15px; border-radius: 8px; margin-bottom: 20px; text-align: center; }
    .alert-error { background: #ffebee; color: var(--error); border: 1px solid #ffcdd2; }
    .alert-success { background: #e8f5e9; color: var(--success); border: 1px solid #c8e6c9; }
    
    @media (max-width: 768px) {
      .half-width, .third-width { width: 100%; }
      .register-card { padding: 20px; }
    }
  `]
})
export class Register {
  registerForm: FormGroup;
  errorMsg = '';
  successMsg = '';
  bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  constructor(private fb: FormBuilder, private auth: Auth, private router: Router) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@gmail\\.com$')]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      gender: ['', Validators.required],
      bloodGroup: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(18), Validators.max(60)]],
      weight: ['', [Validators.required, Validators.min(50)]],
      city: ['', Validators.required],
      lastDonationDate: [''],
      // Password must contain uppercase, lowercase, number, special char
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,20}$')]],
      confirmPassword: ['', Validators.required],
      terms: [false, Validators.requiredTrue]
    }, { validators: this.passwordMatchValidator });
  }

  get f() { return this.registerForm.controls; }

  passwordMatchValidator(g: AbstractControl): ValidationErrors | null {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null : { 'passwordMismatch': true };
  }

  onSubmit() {
    if (this.registerForm.invalid) return;
    
    this.errorMsg = '';
    
    const userData: User = this.registerForm.value;
    delete (userData as any)['confirmPassword']; // dont save this
    delete (userData as any)['terms'];
    
    const success = this.auth.register(userData);
    
    if (success) {
      this.successMsg = 'Registration successful! Redirecting to login...';
      // keep short delay for success message viewing, but no loading spinner
      setTimeout(() => this.router.navigate(['/login']), 1000);
    } else {
      this.errorMsg = 'Email is already registered.';
    }
  }
}
