import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private readonly USERS_KEY = 'blood_donation_users';
  private readonly CURRENT_USER_KEY = 'blood_donation_current_user';
  
  currentUser = signal<User | null>(this.getStoredUser());
  
  constructor(private router: Router) {}

  private getStoredUser(): User | null {
    const userStr = localStorage.getItem(this.CURRENT_USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  }

  getUsers(): User[] {
    const usersStr = localStorage.getItem(this.USERS_KEY);
    return usersStr ? JSON.parse(usersStr) : [];
  }

  register(user: User): boolean {
    const users = this.getUsers();
    
    // Check if email already exists
    if (users.find(u => u.email === user.email)) {
      return false;
    }
    
    user.id = Math.random().toString(36).substring(2, 9);
    user.role = 'donor';
    
    users.push(user);
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
    return true;
  }

  login(email: string, password?: string): boolean {
    const users = this.getUsers();
    // In a real app we'd hash and compare passwords. For this dummy app we just check email
    // and dummy password if needed.
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));
      this.currentUser.set(user);
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem(this.CURRENT_USER_KEY);
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }
  
  isLoggedIn(): boolean {
    return this.currentUser() !== null;
  }

  sendMessage(donorEmail: string, messageText: string, fromUser: User) {
    const users = this.getUsers();
    const donorIndex = users.findIndex(u => u.email === donorEmail);
    if (donorIndex !== -1) {
      if (!users[donorIndex].messages) {
        users[donorIndex].messages = [];
      }
      users[donorIndex].messages.push({
        id: Math.random().toString(36).substring(2, 9),
        fromName: fromUser.name,
        fromBloodGroup: fromUser.bloodGroup || 'Unknown',
        message: messageText,
        date: new Date().toISOString(),
        read: false
      });
      localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
      
      if (this.currentUser()?.email === donorEmail) {
        this.currentUser.set(users[donorIndex]);
        localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(users[donorIndex]));
      }
    }
  }

  markMessagesRead(userEmail: string) {
    const users = this.getUsers();
    const index = users.findIndex(u => u.email === userEmail);
    if (index !== -1 && users[index].messages) {
      users[index].messages.forEach(m => m.read = true);
      localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
      if (this.currentUser()?.email === userEmail) {
        this.currentUser.set(users[index]);
        localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(users[index]));
      }
    }
  }
}
