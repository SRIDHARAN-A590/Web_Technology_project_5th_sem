import { Injectable, signal } from '@angular/core';
import { BloodRequest, BloodBankModel } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class Data {
  private readonly REQUESTS_KEY = 'blood_donation_requests';
  
  private defaultBloodBanks: BloodBankModel[] = [
    {
      id: 'bb1',
      name: 'City General Hospital Blood Bank',
      address: '123 Medical Way, City Center',
      contact: '555-0101',
      availableBloodGroups: { 'A+': 12, 'A-': 3, 'B+': 8, 'B-': 2, 'AB+': 5, 'AB-': 1, 'O+': 20, 'O-': 4 }
    },
    {
      id: 'bb2',
      name: 'Red Cross Regional Center',
      address: '456 Health Blvd, North District',
      contact: '555-0202',
      availableBloodGroups: { 'A+': 25, 'A-': 8, 'B+': 15, 'B-': 4, 'AB+': 10, 'AB-': 2, 'O+': 30, 'O-': 10 }
    },
    {
      id: 'bb3',
      name: 'Metro Care Hospital',
      address: '789 Westside Ave',
      contact: '555-0303',
      availableBloodGroups: { 'A+': 5, 'A-': 0, 'B+': 4, 'B-': 1, 'AB+': 2, 'AB-': 0, 'O+': 8, 'O-': 1 }
    }
  ];

  bloodBanks = signal<BloodBankModel[]>(this.defaultBloodBanks);
  bloodRequests = signal<BloodRequest[]>(this.getRequests());

  constructor() {}

  getRequests(): BloodRequest[] {
    const reqStr = localStorage.getItem(this.REQUESTS_KEY);
    if (reqStr) {
      return JSON.parse(reqStr);
    }
    // Dummy initial data
    const initial: BloodRequest[] = [
      {
        id: 'r1',
        patientName: 'John Doe',
        hospital: 'City General',
        bloodGroup: 'O-',
        unitsRequired: 2,
        contactNumber: '555-9876',
        requiredDate: new Date().toISOString().split('T')[0],
        hospitalAddress: '123 Medical Way',
        reason: 'Surgery',
        status: 'pending',
        createdAt: new Date().toISOString()
      }
    ];
    localStorage.setItem(this.REQUESTS_KEY, JSON.stringify(initial));
    return initial;
  }

  addRequest(request: BloodRequest): void {
    const current = this.getRequests();
    request.id = Math.random().toString(36).substring(2, 9);
    request.status = 'pending';
    request.createdAt = new Date().toISOString();
    
    current.push(request);
    localStorage.setItem(this.REQUESTS_KEY, JSON.stringify(current));
    this.bloodRequests.set(current);
  }
}
