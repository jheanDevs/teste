import React from 'react';
import { Contract } from '../../types';

interface ContractFormProps {
  onSubmit: (data: Omit<Contract, 'id'>) => void;
  initialData?: Contract;
  properties: Array<{ id: string; address: string }>;
  tenants: Array<{ id: string; name: string }>;
}

export default function ContractForm({ 
  onSubmit, 
  initialData,
  properties,
  tenants 
}: ContractFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    onSubmit({
      propertyId: formData.get('propertyId') as string,
      tenantId: formData.get('tenantId') as string,
      startDate: new Date(formData.get('startDate') as string),
      endDate: new Date(formData.get('endDate') as string),
      monthlyRent: Number(formData.get('monthlyRent')),
      status: formData.get('status') as Contract['status'],
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="propertyId" className="block text-sm font-medium text-gray-700">
          Property
        </label>
        <select
          name="propertyId"
          id="propertyId"
          defaultValue={initialData?.propertyId}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        >
          <option value="">Select a property</option>
          {properties.map(property => (
            <option key={property.id} value={property.id}>
              {property.address}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="tenantId" className="block text-sm font-medium text-gray-700">
          Tenant
        </label>
        <select
          name="tenantId"
          id="tenantId"
          defaultValue={initialData?.tenantId}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        >
          <option value="">Select a tenant</option>
          {tenants.map(tenant => (
            <option key={tenant.id} value={tenant.id}>
              {tenant.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
            Start Date
          </label>
          <input
            type="date"
            name="startDate"
            id="startDate"
            defaultValue={initialData?.startDate.toISOString().split('T')[0]}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
            End Date
          </label>
          <input
            type="date"
            name="endDate"
            id="endDate"
            defaultValue={initialData?.endDate.toISOString().split('T')[0]}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="monthlyRent" className="block text-sm font-medium text-gray-700">
          Monthly Rent (R$)
        </label>
        <input
          type="number"
          name="monthlyRent"
          id="monthlyRent"
          defaultValue={initialData?.monthlyRent}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
          Status
        </label>
        <select
          name="status"
          id="status"
          defaultValue={initialData?.status}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        >
          <option value="active">Active</option>
          <option value="expired">Expired</option>
          <option value="terminated">Terminated</option>
        </select>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {initialData ? 'Update Contract' : 'Create Contract'}
        </button>
      </div>
    </form>
  );
}