import React, { useState } from 'react';
import { Search, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { format } from 'date-fns';
import Table from '../components/ui/Table';
import { Payment } from '../types';

const mockPayments: Payment[] = [
  {
    id: '1',
    contractId: '1',
    amount: 2500,
    dueDate: new Date('2024-03-05'),
    paidDate: new Date('2024-03-03'),
    status: 'paid',
  },
  {
    id: '2',
    contractId: '1',
    amount: 2500,
    dueDate: new Date('2024-04-05'),
    status: 'pending',
  },
  {
    id: '3',
    contractId: '2',
    amount: 4800,
    dueDate: new Date('2024-02-05'),
    status: 'overdue',
  },
];

const columns = [
  { 
    header: 'Property',
    accessor: () => 'Property Name' // Would be fetched from contract/property data
  },
  { 
    header: 'Tenant',
    accessor: () => 'Tenant Name' // Would be fetched from contract/tenant data
  },
  { 
    header: 'Amount',
    accessor: (payment: Payment) => 
      `R$ ${payment.amount.toLocaleString('pt-BR')}`
  },
  { 
    header: 'Due Date',
    accessor: (payment: Payment) => format(payment.dueDate, 'dd/MM/yyyy')
  },
  { 
    header: 'Paid Date',
    accessor: (payment: Payment) => 
      payment.paidDate ? format(payment.paidDate, 'dd/MM/yyyy') : '-'
  },
  {
    header: 'Status',
    accessor: (payment: Payment) => {
      const statusConfig = {
        paid: { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
        pending: { icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-50' },
        overdue: { icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50' }
      };
      const { icon: Icon, color, bg } = statusConfig[payment.status];
      return (
        <div className={`flex items-center ${color} ${bg} px-3 py-1 rounded-full w-fit`}>
          <Icon className="w-4 h-4 mr-2" />
          <span className="capitalize text-sm font-medium">{payment.status}</span>
        </div>
      );
    }
  }
];

export default function Payments() {
  const [searchTerm, setSearchTerm] = useState('');
  const [payments] = useState(mockPayments);

  const filteredPayments = payments;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search payments..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table
          data={filteredPayments}
          columns={columns}
          onRowClick={(payment) => console.log('Payment clicked:', payment.id)}
        />
      </div>
    </div>
  );
}