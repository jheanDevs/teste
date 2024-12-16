<<<<<<< HEAD
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
=======
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export type TipoNotificacao =
  | 'lembrete_pagamento'
  | 'pagamento_vencido'
  | 'renovacao_contrato'
  | 'contrato_vencendo';

interface NotificacaoBase {
  tipo: TipoNotificacao;
  destinatarioId: string;
  telefone: string;
  mensagem: string;
}

export interface NotificacaoPagamento extends NotificacaoBase {
  tipo: 'lembrete_pagamento' | 'pagamento_vencido';
  valor: number;
  dataVencimento: Date;
}

export const enviarNotificacaoWhatsApp = async (dados: NotificacaoBase): Promise<void> => {
  // Simulação de envio via WhatsApp API
  console.log('Enviando notificação WhatsApp:', dados);
  
  // Aqui você implementaria a integração real com a API do WhatsApp Business
  // Exemplo usando a API do WhatsApp Cloud
  try {
    const mensagem = {
      messaging_product: "whatsapp",
      to: dados.telefone,
      type: "text",
      text: { body: dados.mensagem }
    };

    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Notificação WhatsApp enviada com sucesso');
  } catch (error) {
    console.error('Erro ao enviar notificação WhatsApp:', error);
    throw new Error('Falha ao enviar notificação');
  }
};

export const gerarMensagemLembretePagamento = (
  nome: string,
  valor: number,
  dataVencimento: Date
): string => {
  const dataFormatada = format(dataVencimento, "dd 'de' MMMM", { locale: ptBR });
  return `Olá ${nome}, lembramos que você tem um pagamento de R$ ${valor.toFixed(2)} previsto para ${dataFormatada}. Por favor, mantenha seu pagamento em dia.`;
};

export const gerarMensagemPagamentoVencido = (
  nome: string,
  valor: number,
  dataVencimento: Date
): string => {
  const dataFormatada = format(dataVencimento, "dd 'de' MMMM", { locale: ptBR });
  return `Atenção ${nome}, identificamos que seu pagamento de R$ ${valor.toFixed(2)} venceu em ${dataFormatada}. Entre em contato conosco para regularizar sua situação.`;
>>>>>>> 12d71df (atualição suporte)
};