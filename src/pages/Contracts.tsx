import React, { useState } from 'react';
import { Plus, Search, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import Button from '../components/ui/Button';
import Table from '../components/ui/Table';
import AddContractModal from '../components/modals/AddContractModal';
import useModal from '../hooks/useModal';
import { Contract } from '../types';

const mockContracts: Contract[] = [
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

// Mock data for properties and tenants
const mockProperties = [
  { id: '1', address: 'Av. Paulista, 1000' },
  { id: '2', address: 'Rua Augusta, 500' },
  { id: '3', address: 'Rua Oscar Freire, 200' },
];

const mockTenants = [
  { id: '1', name: 'João Silva' },
  { id: '2', name: 'Maria Santos' },
  { id: '3', name: 'Pedro Oliveira' },
];

const columns = [
  { 
    header: 'Imóvel',
    accessor: () => 'Nome do Imóvel' // Would be fetched from property data
  },
  { 
    header: 'Inquilino',
    accessor: () => 'Nome do Inquilino' // Would be fetched from tenant data
  },
  { 
    header: 'Data Início',
    accessor: (contract: Contract) => format(contract.startDate, 'dd/MM/yyyy')
  },
  { 
    header: 'Data Fim',
    accessor: (contract: Contract) => format(contract.endDate, 'dd/MM/yyyy')
  },
  { 
    header: 'Valor Mensal',
    accessor: (contract: Contract) => 
      `R$ ${contract.monthlyRent.toLocaleString('pt-BR')}`
  },
  {
    header: 'Status',
    accessor: (contract: Contract) => {
      const statusConfig = {
        active: { icon: CheckCircle, color: 'text-green-600', label: 'Ativo' },
        expired: { icon: XCircle, color: 'text-red-600', label: 'Expirado' },
        terminated: { icon: AlertCircle, color: 'text-yellow-600', label: 'Rescindido' }
      };
      const { icon: Icon, color, label } = statusConfig[contract.status];
      return (
        <div className="flex items-center">
          <Icon className={`w-5 h-5 mr-2 ${color}`} />
          <span className="capitalize">{label}</span>
        </div>
      );
    }
  }
];

export default function Contracts() {
  const [searchTerm, setSearchTerm] = useState('');
  const [contracts, setContracts] = useState(mockContracts);
  const addContractModal = useModal();

  const handleAddContract = (data: Omit<Contract, 'id'>) => {
    const newContract = {
      ...data,
      id: String(contracts.length + 1),
    };
    setContracts([...contracts, newContract]);
    addContractModal.close();
  };

  const filteredContracts = contracts.filter(contract =>
    mockProperties.find(p => p.id === contract.propertyId)?.address
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) ||
    mockTenants.find(t => t.id === contract.tenantId)?.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Contratos</h1>
        <Button icon={Plus} onClick={addContractModal.open}>Novo Contrato</Button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar contratos..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table
          data={filteredContracts}
          columns={columns}
          onRowClick={(contract) => console.log('Contract clicked:', contract.id)}
        />
      </div>

      <AddContractModal
        isOpen={addContractModal.isOpen}
        onClose={addContractModal.close}
        onSubmit={handleAddContract}
        properties={mockProperties}
        tenants={mockTenants}
      />
    </div>
  );
}