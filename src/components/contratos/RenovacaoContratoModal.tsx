import React, { useState } from 'react';
import { addMonths } from 'date-fns';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { Contrato } from '../../types';
import { renovarContrato } from '../../services/contratoService';

interface RenovacaoContratoModalProps {
  isOpen: boolean;
  onClose: () => void;
  contrato: Contrato;
  onRenovar: (contratoRenovado: Contrato) => void;
}

export default function RenovacaoContratoModal({
  isOpen,
  onClose,
  contrato,
  onRenovar,
}: RenovacaoContratoModalProps) {
  const [novaDataFim, setNovaDataFim] = useState(
    addMonths(contrato.dataFim, 12).toISOString().split('T')[0]
  );
  const [novoValor, setNovoValor] = useState(contrato.valorMensal);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const contratoRenovado = await renovarContrato(
        contrato,
        new Date(novaDataFim),
        novoValor
      );
      onRenovar(contratoRenovado);
      onClose();
    } catch (error) {
      console.error('Erro ao renovar contrato:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Renovar Contrato"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nova Data de Término
          </label>
          <input
            type="date"
            value={novaDataFim}
            onChange={(e) => setNovaDataFim(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            min={new Date().toISOString().split('T')[0]}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Novo Valor Mensal (R$)
          </label>
          <input
            type="number"
            value={novoValor}
            onChange={(e) => setNovoValor(Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            min={0}
            step={0.01}
            required
          />
        </div>

        <div className="flex justify-end space-x-3">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={loading}
          >
            {loading ? 'Renovando...' : 'Renovar Contrato'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}