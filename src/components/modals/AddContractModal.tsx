import React from 'react';
import Modal from '../ui/Modal';
import ContractForm from '../forms/ContractForm';
import { Contract } from '../../types';

interface AddContractModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Contract, 'id'>) => void;
  properties: Array<{ id: string; address: string }>;
  tenants: Array<{ id: string; name: string }>;
}

export default function AddContractModal({ 
  isOpen, 
  onClose, 
  onSubmit,
  properties,
  tenants 
}: AddContractModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Contract"
    >
      <ContractForm 
        onSubmit={onSubmit}
        properties={properties}
        tenants={tenants}
      />
    </Modal>
  );
}