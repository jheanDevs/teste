import { Contrato, StatusContrato } from '../types';
import { enviarNotificacao } from './notificacaoService';

export const verificarRenovacaoContrato = (contrato: Contrato): boolean => {
  const hoje = new Date();
  const diasParaVencimento = Math.ceil(
    (contrato.dataFim.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24)
  );
  return diasParaVencimento <= 30 && contrato.status === 'ativo';
};

export const renovarContrato = async (
  contrato: Contrato,
  novaDataFim: Date,
  novoValor?: number
): Promise<Contrato> => {
  const contratoRenovado: Contrato = {
    ...contrato,
    dataFim: novaDataFim,
    valorMensal: novoValor || contrato.valorMensal,
  };

  // Aqui você faria a chamada à API para atualizar o contrato
  await enviarNotificacao({
    tipo: 'renovacao_contrato',
    destinatarioId: contrato.inquilinoId,
    dados: {
      contratoId: contrato.id,
      novaDataFim: novaDataFim.toISOString(),
      novoValor: novoValor,
    },
  });

  return contratoRenovado;
};

export const atualizarStatusContrato = async (
  contrato: Contrato,
  novoStatus: StatusContrato
): Promise<Contrato> => {
  const contratoAtualizado: Contrato = {
    ...contrato,
    status: novoStatus,
  };

  // Aqui você faria a chamada à API para atualizar o status
  if (novoStatus === 'expirado' || novoStatus === 'rescindido') {
    await enviarNotificacao({
      tipo: 'alteracao_status_contrato',
      destinatarioId: contrato.inquilinoId,
      dados: {
        contratoId: contrato.id,
        novoStatus,
      },
    });
  }

  return contratoAtualizado;
};