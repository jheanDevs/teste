import React from 'react';
import Modal from '../ui/Modal';
import TenantForm from '../forms/TenantForm';
import { Tenant } from '../../types';

interface AddTenantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Tenant, 'id'>) => void;
}

export default function AddTenantModal({ isOpen, onClose, onSubmit }: AddTenantModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Tenant"
    >
      <TenantForm onSubmit={onSubmit} />
    </Modal>
  );
}