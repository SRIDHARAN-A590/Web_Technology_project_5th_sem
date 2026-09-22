import { Routes } from '@angular/router';
import { Landing } from './components/landing/landing';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Dashboard } from './components/dashboard/dashboard';
import { RequestBlood } from './components/request-blood/request-blood';
import { DonorList } from './components/donor-list/donor-list';
import { Contact } from './components/contact/contact';

export const routes: Routes = [
  { path: '', component: Landing },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'dashboard', component: Dashboard },
  { path: 'request-blood', component: RequestBlood },
  { path: 'donors', component: DonorList },
  { path: 'contact', component: Contact },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];
