export type TipoNotificacao =
  | 'renovacao_contrato'
  | 'vencimento_pagamento'
  | 'pagamento_atrasado'
  | 'alteracao_status_contrato';

interface Notificacao {
  tipo: TipoNotificacao;
  destinatarioId: string;
  dados: Record<string, any>;
}

export const enviarNotificacao = async (notificacao: Notificacao): Promise<void> => {
  // Simulação de envio de notificação
  console.log('Enviando notificação:', notificacao);
  
  // Aqui você implementaria a lógica real de envio de notificações
  // Exemplo: envio de e-mail, push notification, SMS, etc.
  await new Promise(resolve => setTimeout(resolve, 1000));
};

export const enviarLembretesPagamento = async (
  pagamentosProximos: Array<{ contratoId: string; dataVencimento: Date; valor: number }>
): Promise<void> => {
  for (const pagamento of pagamentosProximos) {
    await enviarNotificacao({
      tipo: 'vencimento_pagamento',
      destinatarioId: pagamento.contratoId,
      dados: {
        dataVencimento: pagamento.dataVencimento.toISOString(),
        valor: pagamento.valor,
      },
    });
  }
};