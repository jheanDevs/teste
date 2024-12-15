// Property Types
export interface Property {
  id: string;
  address: string;
  type: 'apartment' | 'house' | 'commercial';
  area: number;
  bedrooms: number;
  rentAmount: number;
  status: PropertyStatus;
}

export type PropertyStatus = 'available' | 'occupied' | 'maintenance';

// Tenant Types
export interface Tenant {
  id: string;
  name: string;
  cpf: string;
  email: string;
  phone: string;
}

// Contract Types
export interface Contract {
  id: string;
  propertyId: string;
  tenantId: string;
  startDate: Date;
  endDate: Date;
  monthlyRent: number;
  status: ContractStatus;
}

export type ContractStatus = 'active' | 'expired' | 'terminated';

// Payment Types
export interface Payment {
  id: string;
  contractId: string;
  amount: number;
  dueDate: Date;
  paidDate?: Date;
  status: PaymentStatus;
}

export type PaymentStatus = 'pending' | 'paid' | 'overdue';

// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  company?: string;
  phone?: string;
  status: UserStatus;
}

export type UserRole = 'admin' | 'owner';
export type UserStatus = 'active' | 'inactive';