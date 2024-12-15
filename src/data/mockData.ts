import { Property, Tenant, Contract } from '../types';

export const mockProperties: Property[] = [
  {
    id: '1',
    address: 'Av. Paulista, 1000, São Paulo',
    type: 'apartment',
    area: 75,
    bedrooms: 2,
    rentAmount: 2500,
    status: 'available',
  },
  {
    id: '2',
    address: 'Rua Augusta, 500, São Paulo',
    type: 'commercial',
    area: 120,
    bedrooms: 0,
    rentAmount: 4800,
    status: 'occupied',
  },
  {
    id: '3',
    address: 'Rua Oscar Freire, 200, São Paulo',
    type: 'house',
    area: 150,
    bedrooms: 3,
    rentAmount: 5500,
    status: 'maintenance',
  },
];

export const mockTenants: Tenant[] = [
  {
    id: '1',
    name: 'João Silva',
    cpf: '123.456.789-00',
    email: 'joao.silva@email.com',
    phone: '(11) 98765-4321',
  },
  {
    id: '2',
    name: 'Maria Santos',
    cpf: '987.654.321-00',
    email: 'maria.santos@email.com',
    phone: '(11) 91234-5678',
  },
  {
    id: '3',
    name: 'Pedro Oliveira',
    cpf: '456.789.123-00',
    email: 'pedro.oliveira@email.com',
    phone: '(11) 94567-8901',
  },
];

export const mockContracts: Contract[] = [
  {
    id: '1',
    propertyId: '1',
    tenantId: '1',
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-12-31'),
    monthlyRent: 2500,
    status: 'active',
  },
  {
    id: '2',
    propertyId: '2',
    tenantId: '2',
    startDate: new Date('2023-06-01'),
    endDate: new Date('2024-05-31'),
    monthlyRent: 4800,
    status: 'active',
  },
  {
    id: '3',
    propertyId: '3',
    tenantId: '3',
    startDate: new Date('2023-01-01'),
    endDate: new Date('2023-12-31'),
    monthlyRent: 3500,
    status: 'expired',
  },
];