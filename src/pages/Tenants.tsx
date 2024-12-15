import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import Button from '../components/ui/Button';
import Table from '../components/ui/Table';
import AddTenantModal from '../components/modals/AddTenantModal';
import useModal from '../hooks/useModal';
import { Tenant } from '../types';

// Mock data - will be replaced with API calls
const mockTenants: Tenant[] = [
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

const columns = [
  { header: 'Nome', accessor: 'name' },
  { header: 'CPF', accessor: 'cpf' },
  { header: 'Email', accessor: 'email' },
  { header: 'Telefone', accessor: 'phone' },
];

export default function Tenants() {
  const [searchTerm, setSearchTerm] = useState('');
  const [tenants, setTenants] = useState(mockTenants);
  const addTenantModal = useModal();

  const filteredTenants = tenants.filter(tenant =>
    tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tenant.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddTenant = (data: Omit<Tenant, 'id'>) => {
    const newTenant = {
      ...data,
      id: String(tenants.length + 1),
    };
    setTenants([...tenants, newTenant]);
    addTenantModal.close();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Inquilinos</h1>
        <Button icon={Plus} onClick={addTenantModal.open}>Adicionar Inquilino</Button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar inquilinos..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table
          data={filteredTenants}
          columns={columns}
          onRowClick={(tenant) => console.log('Tenant clicked:', tenant.id)}
        />
      </div>

      <AddTenantModal
        isOpen={addTenantModal.isOpen}
        onClose={addTenantModal.close}
        onSubmit={handleAddTenant}
      />
    </div>
  );
}