import React from 'react';
import { Property } from '../../types';

interface PropertyFormProps {
  onSubmit: (data: Omit<Property, 'id'>) => void;
  initialData?: Property;
}

export default function PropertyForm({ onSubmit, initialData }: PropertyFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    onSubmit({
      address: formData.get('address') as string,
      type: formData.get('type') as Property['type'],
      area: Number(formData.get('area')),
      bedrooms: Number(formData.get('bedrooms')),
      rentAmount: Number(formData.get('rentAmount')),
      status: formData.get('status') as Property['status'],
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
          Address
        </label>
        <input
          type="text"
          name="address"
          id="address"
          defaultValue={initialData?.address}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label htmlFor="type" className="block text-sm font-medium text-gray-700">
          Type
        </label>
        <select
          name="type"
          id="type"
          defaultValue={initialData?.type}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        >
          <option value="apartment">Apartment</option>
          <option value="house">House</option>
          <option value="commercial">Commercial</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="area" className="block text-sm font-medium text-gray-700">
            Area (m²)
          </label>
          <input
            type="number"
            name="area"
            id="area"
            defaultValue={initialData?.area}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700">
            Bedrooms
          </label>
          <input
            type="number"
            name="bedrooms"
            id="bedrooms"
            defaultValue={initialData?.bedrooms}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="rentAmount" className="block text-sm font-medium text-gray-700">
          Monthly Rent (R$)
        </label>
        <input
          type="number"
          name="rentAmount"
          id="rentAmount"
          defaultValue={initialData?.rentAmount}
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
          <option value="available">Available</option>
          <option value="occupied">Occupied</option>
          <option value="maintenance">Maintenance</option>
        </select>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {initialData ? 'Update Property' : 'Add Property'}
        </button>
      </div>
    </form>
  );
}