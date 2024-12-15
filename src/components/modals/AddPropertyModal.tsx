import React from 'react';
import Modal from '../ui/Modal';
import PropertyForm from '../forms/PropertyForm';
import { Property } from '../../types';

interface AddPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Property, 'id'>) => void;
}

export default function AddPropertyModal({ isOpen, onClose, onSubmit }: AddPropertyModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Property"
    >
      <PropertyForm onSubmit={onSubmit} />
    </Modal>
  );
}