import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  template: `
    <div class="hero-bg fade-in">
      <div class="container">
        <h1 class="text-center" style="color: white; margin: 0; padding: 60px 0;">Contact Us</h1>
      </div>
    </div>

    <div class="container section slide-up" style="margin-top: -60px; position: relative; z-index: 10;">
      <div class="contact-grid">
        <!-- Contact Info -->
        <div class="card contact-info">
          <h3>Get In Touch</h3>
          <p style="margin-bottom: 30px;">Have questions about blood donation? Want to organize a blood camp? We're here to help.</p>
          
          <div class="info-item">
            <div class="icon-box"><i class="fa-solid fa-location-dot"></i></div>
            <div>
              <h4>Our Location</h4>
              <p>123 Health Ave, Medical City, MC 10012</p>
            </div>
          </div>
          
          <div class="info-item">
            <div class="icon-box"><i class="fa-solid fa-phone"></i></div>
            <div>
              <h4>Phone Number</h4>
              <p>Emergency: +1 800 123 4567<br>General: +1 234 567 8900</p>
            </div>
          </div>
          
          <div class="info-item">
            <div class="icon-box"><i class="fa-solid fa-envelope"></i></div>
            <div>
              <h4>Email Address</h4>
              <p>help&#64;lifeblood.org<br>camps&#64;lifeblood.org</p>
            </div>
          </div>
          
          <div class="social-links">
            <h4>Follow Us</h4>
            <div style="display: flex; gap: 15px; margin-top: 10px;">
              <a href="#" class="social-icon"><i class="fa-brands fa-facebook-f"></i></a>
              <a href="#" class="social-icon"><i class="fa-brands fa-twitter"></i></a>
              <a href="#" class="social-icon"><i class="fa-brands fa-instagram"></i></a>
              <a href="#" class="social-icon"><i class="fa-brands fa-linkedin-in"></i></a>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="card contact-form-card">
          <h3>Send a Message</h3>
          
          <div *ngIf="successMsg" class="alert alert-success">{{ successMsg }}</div>
          
          <form [formGroup]="contactForm" (ngSubmit)="onSubmit()">
            <div class="form-group">
              <label class="form-label">Your Name</label>
              <input type="text" class="form-control" formControlName="name"
                     [class.is-invalid]="f['name'].invalid && (f['name'].dirty || f['name'].touched)">
              <div *ngIf="f['name'].invalid && (f['name'].dirty || f['name'].touched)" class="error-message">
                Name is required
              </div>
            </div>
            
            <div class="form-group">
              <label class="form-label">Email Address</label>
              <input type="email" class="form-control" formControlName="email"
                     [class.is-invalid]="f['email'].invalid && (f['email'].dirty || f['email'].touched)">
              <div *ngIf="f['email'].invalid && (f['email'].dirty || f['email'].touched)" class="error-message">
                <span *ngIf="f['email'].errors?.['required']">Email is required</span>
                <span *ngIf="f['email'].errors?.['email']">Invalid email format</span>
              </div>
            </div>
            
            <div class="form-group">
              <label class="form-label">Subject</label>
              <input type="text" class="form-control" formControlName="subject"
                     [class.is-invalid]="f['subject'].invalid && (f['subject'].dirty || f['subject'].touched)">
              <div *ngIf="f['subject'].invalid && (f['subject'].dirty || f['subject'].touched)" class="error-message">
                Subject is required
              </div>
            </div>
            
            <div class="form-group">
              <label class="form-label">Message</label>
              <textarea class="form-control" rows="5" formControlName="message"
                        [class.is-invalid]="f['message'].invalid && (f['message'].dirty || f['message'].touched)"></textarea>
              <div *ngIf="f['message'].invalid && (f['message'].dirty || f['message'].touched)" class="error-message">
                <span *ngIf="f['message'].errors?.['required']">Message is required</span>
                <span *ngIf="f['message'].errors?.['minlength']">Message must be at least 20 characters long</span>
              </div>
            </div>
            
            <button type="submit" class="btn btn-primary btn-block" [disabled]="contactForm.invalid || isLoading">
              <span *ngIf="!isLoading">Send Message</span>
              <span *ngIf="isLoading"><i class="fa-solid fa-spinner fa-spin"></i> Sending...</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .hero-bg {
      background: linear-gradient(135deg, var(--primary-color) 0%, #b71c1c 100%);
      height: 200px;
    }
    .contact-grid {
      display: grid;
      grid-template-columns: 1fr 1.5fr;
      gap: 30px;
    }
    .contact-info {
      background: var(--dark-gray);
      color: white;
    }
    .contact-info h3 { color: white; margin-bottom: 20px; }
    .contact-info p { color: #ccc; }
    
    .info-item {
      display: flex;
      gap: 20px;
      margin-bottom: 30px;
    }
    .icon-box {
      width: 50px;
      height: 50px;
      background: rgba(255,255,255,0.1);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
      color: var(--primary-color);
      flex-shrink: 0;
    }
    .info-item h4 { color: white; margin-bottom: 5px; font-size: 1.1rem; }
    .info-item p { margin: 0; font-size: 0.95rem; }
    
    .social-links {
      margin-top: 40px;
      padding-top: 30px;
      border-top: 1px solid rgba(255,255,255,0.1);
    }
    .social-links h4 { color: white; margin-bottom: 15px; }
    .social-icon {
      width: 40px;
      height: 40px;
      background: rgba(255,255,255,0.1);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      transition: var(--transition);
    }
    .social-icon:hover {
      background: var(--primary-color);
      transform: translateY(-3px);
    }
    
    .contact-form-card { padding: 40px; }
    .contact-form-card h3 { margin-bottom: 30px; color: var(--dark-gray); }
    
    .alert { padding: 15px; border-radius: 8px; margin-bottom: 20px; text-align: center; }
    .alert-success { background: #e8f5e9; color: var(--success); border: 1px solid #c8e6c9; }
    .btn-block { width: 100%; padding: 14px; font-size: 1.1rem; margin-top: 10px; }
    
    @media (max-width: 992px) {
      .contact-grid { grid-template-columns: 1fr; }
    }
  `]
})
export class Contact {
  contactForm: FormGroup;
  isLoading = false;
  successMsg = '';

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(20)]]
    });
  }

  get f() { return this.contactForm.controls; }

  onSubmit() {
    if (this.contactForm.invalid) return;
    
    this.isLoading = true;
    
    setTimeout(() => {
      this.isLoading = false;
      this.successMsg = 'Your message has been sent successfully. We will get back to you soon!';
      this.contactForm.reset();
      
      setTimeout(() => {
        this.successMsg = '';
      }, 5000);
    }, 1500);
  }
}
