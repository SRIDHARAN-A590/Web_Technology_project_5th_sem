import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="footer">
      <div class="container footer-content">
        <div class="footer-section">
          <h3><i class="fa-solid fa-droplet"></i> LifeBlood</h3>
          <p>Connecting blood donors with those in need. Every drop counts, and you can be a hero today.</p>
          <div class="social-icons">
            <a href="#"><i class="fa-brands fa-facebook"></i></a>
            <a href="#"><i class="fa-brands fa-twitter"></i></a>
            <a href="#"><i class="fa-brands fa-instagram"></i></a>
          </div>
        </div>
        
        <div class="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a routerLink="/">Home</a></li>
            <li><a routerLink="/donors">Find Donors</a></li>
            <li><a routerLink="/contact">Contact Us</a></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h3>Contact Info</h3>
          <p><i class="fa-solid fa-location-dot"></i> 123 Health Ave, Medical City</p>
          <p><i class="fa-solid fa-phone"></i> +1 234 567 8900</p>
          <p><i class="fa-solid fa-envelope"></i> help&#64;lifeblood.org</p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2026 LifeBlood Management System. All rights reserved.</p>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background-color: var(--dark-gray);
      color: #fff;
      padding-top: 60px;
      margin-top: auto;
    }
    .footer-content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 40px;
      margin-bottom: 40px;
    }
    .footer-section h3 {
      color: #fff;
      margin-bottom: 20px;
      font-size: 1.2rem;
    }
    .footer-section p {
      color: #ccc;
    }
    .footer-section ul {
      list-style: none;
    }
    .footer-section ul li {
      margin-bottom: 10px;
    }
    .footer-section ul a {
      color: #ccc;
      text-decoration: none;
      transition: var(--transition);
    }
    .footer-section ul a:hover {
      color: var(--primary-color);
      padding-left: 5px;
    }
    .social-icons {
      display: flex;
      gap: 15px;
      margin-top: 20px;
    }
    .social-icons a {
      color: #fff;
      background: rgba(255,255,255,0.1);
      width: 35px;
      height: 35px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      transition: var(--transition);
    }
    .social-icons a:hover {
      background: var(--primary-color);
      transform: translateY(-3px);
    }
    .footer-bottom {
      background: rgba(0,0,0,0.2);
      text-align: center;
      padding: 20px 0;
      color: #aaa;
      font-size: 0.9rem;
    }
    .fa-droplet {
      color: var(--primary-color);
    }
  `]
})
export class Footer {}
