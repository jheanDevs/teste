import React from 'react';
import { Building2, BedDouble, Square } from 'lucide-react';
import { Property } from '../types';
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';

interface PropertyCardProps {
  property: Property;
  onClick?: () => void;
}

export default function PropertyCard({ property, onClick }: PropertyCardProps) {
  const statusColors = {
    available: 'bg-green-100 text-green-800',
    occupied: 'bg-blue-100 text-blue-800',
    maintenance: 'bg-yellow-100 text-yellow-800',
  };

  return (
    <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={onClick}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle>{property.address}</CardTitle>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[property.status]}`}>
            {property.status}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mt-4 space-y-3">
          <div className="flex items-center text-gray-500">
            <Building2 className="w-4 h-4 mr-2" />
            <span className="capitalize">{property.type}</span>
          </div>
          <div className="flex items-center text-gray-500">
            <BedDouble className="w-4 h-4 mr-2" />
            <span>{property.bedrooms} bedrooms</span>
          </div>
          <div className="flex items-center text-gray-500">
            <Square className="w-4 h-4 mr-2" />
            <span>{property.area}m²</span>
          </div>
          <div className="mt-4 pt-4 border-t">
            <span className="text-2xl font-bold text-gray-900">
              R$ {property.rentAmount.toLocaleString('pt-BR')}
            </span>
            <span className="text-gray-500">/month</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}