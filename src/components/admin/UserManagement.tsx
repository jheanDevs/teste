import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Edit, Trash2, UserPlus } from 'lucide-react';
import Button from '../ui/Button';
import Table from '../ui/Table';
import Modal from '../ui/Modal';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  company?: string;
  phone?: string;
  status: 'active' | 'inactive';
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao@empresa.com',
    role: 'admin',
    company: 'Imobiliária ABC',
    phone: '(11) 98765-4321',
    status: 'active'
  },
  // Add more mock users as needed
];

export default function UserManagement() {
  const [users] = useState<User[]>(mockUsers);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const columns = [
    { header: 'Nome', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Função', accessor: 'role' },
    { header: 'Empresa', accessor: (user: User) => user.company || '-' },
    {
      header: 'Status',
      accessor: (user: User) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {user.status === 'active' ? 'Ativo' : 'Inativo'}
        </span>
      )
    },
    {
      header: 'Ações',
      accessor: (user: User) => (
        <div className="flex space-x-2">
          <button className="text-blue-600 hover:text-blue-800">
            <Edit className="w-5 h-5" />
          </button>
          <button className="text-red-600 hover:text-red-800">
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      )
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Gerenciamento de Usuários</h2>
        <Button icon={UserPlus} onClick={() => setIsAddModalOpen(true)}>
          Adicionar Usuário
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar usuários..."
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <Table
          data={users}
          columns={columns}
        />
      </div>

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Adicionar Novo Usuário"
      >
        <form className="space-y-4">
          {/* Add user form fields here */}
        </form>
      </Modal>
    </motion.div>
  );
}