export interface User {
  id?: string;
  name: string;
  email: string;
  password?: string;
  role: 'donor' | 'admin' | 'user';
  bloodGroup?: string;
  phone?: string;
  age?: number;
  weight?: number;
  gender?: string;
  address?: string;
  city?: string;
  lastDonationDate?: string;
  medicalConditions?: string;
  messages?: UserMessage[];
}

export interface UserMessage {
  id: string;
  fromName: string;
  fromBloodGroup: string;
  message: string;
  date: string;
  read: boolean;
}

export interface BloodRequest {
  id?: string;
  patientName: string;
  hospital: string;
  bloodGroup: string;
  unitsRequired: number;
  contactNumber: string;
  requiredDate: string;
  hospitalAddress: string;
  reason: string;
  status: 'pending' | 'fulfilled' | 'cancelled';
  createdAt?: string;
}

export interface BloodBankModel {
  id?: string;
  name: string;
  address: string;
  contact: string;
  availableBloodGroups: {
    'A+': number;
    'A-': number;
    'B+': number;
    'B-': number;
    'AB+': number;
    'AB-': number;
    'O+': number;
    'O-': number;
  };
}
