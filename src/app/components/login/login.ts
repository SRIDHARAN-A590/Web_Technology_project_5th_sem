import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgIf],
  template: `
    <div class="login-container fade-in">
      <div class="login-split">
        <div class="login-left">
          <div class="login-left-content">
            <h2>Welcome Back, Hero!</h2>
            <p>Your small effort can give a second chance at life to someone.</p>
            <div class="illustration">
              <i class="fa-solid fa-hand-holding-medical fa-5x"></i>
            </div>
          </div>
        </div>
        <div class="login-right">
          <div class="login-card card">
            <h2 class="text-center">Sign In</h2>
            <p class="text-center" style="margin-bottom: 30px;">Access your donor dashboard</p>
            
            <div *ngIf="errorMsg" class="alert alert-error">{{ errorMsg }}</div>
            
            <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
              <div class="form-group">
                <label class="form-label">Email Address</label>
                <div class="input-icon-wrapper">
                  <i class="fa-solid fa-envelope input-icon"></i>
                  <input type="email" class="form-control" formControlName="email" 
                         [class.is-invalid]="f['email'].invalid && (f['email'].dirty || f['email'].touched)"
                         placeholder="Enter your email">
                </div>
                <div *ngIf="f['email'].invalid && (f['email'].dirty || f['email'].touched)" class="error-message">
                  <span *ngIf="f['email'].errors?.['required']">Email is required</span>
                  <span *ngIf="f['email'].errors?.['email'] || f['email'].errors?.['pattern']">Must be a valid @gmail.com address</span>
                </div>
              </div>
              
              <div class="form-group">
                <label class="form-label">Password</label>
                <div class="input-icon-wrapper">
                  <i class="fa-solid fa-lock input-icon"></i>
                  <input type="password" class="form-control" formControlName="password"
                         [class.is-invalid]="f['password'].invalid && (f['password'].dirty || f['password'].touched)"
                         placeholder="Enter your password">
                </div>
                <div *ngIf="f['password'].invalid && (f['password'].dirty || f['password'].touched)" class="error-message">
                  <span *ngIf="f['password'].errors?.['required']">Password is required<br></span>
                  <span *ngIf="f['password'].errors?.['minlength']">Minimum 8 characters<br></span>
                  <span *ngIf="f['password'].errors?.['pattern']">Must contain uppercase, lowercase, number, special char</span>
                </div>
              </div>
              
              <div class="form-group flex-between">
                <label class="checkbox-container">
                  <input type="checkbox"> Remember me
                </label>
                <a href="#" class="forgot-link">Forgot Password?</a>
              </div>
              
              <button type="submit" class="btn btn-primary btn-block" [disabled]="loginForm.invalid">
                Login
              </button>
            </form>
            
            <div class="register-prompt">
              Don't have an account? <a routerLink="/register">Register here</a>
            </div>
            <div class="back-home">
              <a routerLink="/"><i class="fa-solid fa-arrow-left"></i> Back to Home</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      min-height: calc(100vh - 70px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px 20px;
      background-color: var(--light-gray);
    }
    .login-split {
      display: flex;
      width: 100%;
      max-width: 1000px;
      background: white;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 15px 30px rgba(0,0,0,0.1);
    }
    .login-left {
      flex: 1;
      background: linear-gradient(135deg, var(--primary-color) 0%, #9c27b0 100%);
      color: white;
      padding: 60px 40px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
    }
    .login-left h2 { color: white; font-size: 2.5rem; margin-bottom: 20px; }
    .login-left p { color: rgba(255,255,255,0.9); font-size: 1.1rem; }
    .illustration { margin-top: 50px; opacity: 0.9; }
    .login-right {
      flex: 1;
      padding: 60px 50px;
      background: white;
    }
    .login-card {
      box-shadow: none;
      padding: 0;
    }
    .login-card h2 { margin-bottom: 10px; }
    .input-icon-wrapper { position: relative; }
    .input-icon {
      position: absolute;
      left: 15px;
      top: 50%;
      transform: translateY(-50%);
      color: #aaa;
    }
    .form-control { padding-left: 45px; }
    .flex-between {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.9rem;
    }
    .btn-block {
      width: 100%;
      padding: 14px;
      font-size: 1.1rem;
      margin-top: 20px;
    }
    .register-prompt {
      text-align: center;
      margin-top: 30px;
      font-size: 0.95rem;
    }
    .register-prompt a {
      color: var(--primary-color);
      font-weight: 600;
      text-decoration: none;
    }
    .back-home {
      text-align: center;
      margin-top: 20px;
      font-size: 0.9rem;
    }
    .back-home a {
      color: var(--text-gray);
      text-decoration: none;
    }
    .alert {
      padding: 12px;
      border-radius: 8px;
      margin-bottom: 20px;
      text-align: center;
    }
    .alert-error {
      background: #ffebee;
      color: var(--error);
      border: 1px solid #ffcdd2;
    }
    @media (max-width: 768px) {
      .login-split { flex-direction: column; }
      .login-left { padding: 40px 20px; }
      .login-right { padding: 40px 20px; }
    }
  `]
})
export class Login {
  loginForm: FormGroup;
  errorMsg = '';

  constructor(private fb: FormBuilder, private auth: Auth, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@gmail\\.com$')]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,20}$')]]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    if (this.loginForm.invalid) return;
    
    this.errorMsg = '';
    
    const { email, password } = this.loginForm.value;
    const success = this.auth.login(email, password);
    
    if (success) {
      this.router.navigate(['/dashboard']);
    } else {
      this.errorMsg = 'Invalid email or password';
    }
  }
}
