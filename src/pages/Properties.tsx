import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import Button from '../components/ui/Button';
import PropertyList from '../components/properties/PropertyList';
import SearchInput from '../components/common/SearchInput';
import PageHeader from '../components/common/PageHeader';
import AddPropertyModal from '../components/modals/AddPropertyModal';
import useModal from '../hooks/useModal';
import { Property } from '../types';

// Mock data moved to a separate file
import { mockProperties } from '../data/mockData';

export default function Properties() {
  const [searchTerm, setSearchTerm] = useState('');
  const [properties, setProperties] = useState(mockProperties);
  const addPropertyModal = useModal();
  
  const filteredProperties = properties.filter(property =>
    property.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProperty = (data: Omit<Property, 'id'>) => {
    const newProperty = {
      ...data,
      id: String(properties.length + 1),
    };
    setProperties([...properties, newProperty]);
    addPropertyModal.close();
  };

  return (
    <div>
      <PageHeader
        title="Imóveis"
        action={
          <Button icon={Plus} onClick={addPropertyModal.open}>
            Adicionar Imóvel
          </Button>
        }
      />

      <div className="mb-6">
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Buscar imóveis..."
        />
      </div>

      <PropertyList
        properties={filteredProperties}
        onPropertyClick={(property) => console.log('Property clicked:', property.id)}
      />

      <AddPropertyModal
        isOpen={addPropertyModal.isOpen}
        onClose={addPropertyModal.close}
        onSubmit={handleAddProperty}
      />
    </div>
  );
}