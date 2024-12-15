import React, { useState } from 'react';
import { Usuario } from '../../types/auth';
import Table from '../ui/Table';
import Button from '../ui/Button';
import { UserPlus, Edit, Trash2 } from 'lucide-react';

const mockUsuarios: Usuario[] = [
  {
    id: '1',
    nome: 'João Silva',
    email: 'joao@exemplo.com',
    tipo: 'proprietario',
    telefone: '(11) 98765-4321'
  },
  {
    id: '2',
    nome: 'Maria Santos',
    email: 'maria@exemplo.com',
    tipo: 'admin',
    empresa: 'Imobiliária XYZ',
    telefone: '(11) 91234-5678'
  }
];

const columns = [
  { header: 'Nome', accessor: 'nome' },
  { header: 'Email', accessor: 'email' },
  { header: 'Tipo', accessor: (user: Usuario) => user.tipo === 'admin' ? 'Administrador' : 'Proprietário' },
  { header: 'Empresa', accessor: (user: Usuario) => user.empresa || '-' },
  { header: 'Telefone', accessor: (user: Usuario) => user.telefone || '-' },
  {
    header: 'Ações',
    accessor: (user: Usuario) => (
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

export default function GerenciarUsuarios() {
  const [usuarios] = useState<Usuario[]>(mockUsuarios);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsuarios = usuarios.filter(usuario =>
    usuario.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    usuario.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Gerenciar Usuários</h2>
        <Button icon={UserPlus}>Adicionar Usuário</Button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4">
          <input
            type="text"
            placeholder="Buscar usuários..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Table
          data={filteredUsuarios}
          columns={columns}
        />
      </div>
    </div>
  );
}