import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const formatarMensagemPagamento = (
  nome: string,
  valor: number,
  dataVencimento: Date,
  tipo: 'lembrete' | 'vencido'
): string => {
  const dataFormatada = format(dataVencimento, "dd 'de' MMMM", { locale: ptBR });
  
  const mensagens = {
    lembrete: `Olá ${nome}, lembramos que você tem um pagamento de R$ ${valor.toFixed(2)} previsto para ${dataFormatada}. Por favor, mantenha seu pagamento em dia.`,
    vencido: `Atenção ${nome}, identificamos que seu pagamento de R$ ${valor.toFixed(2)} venceu em ${dataFormatada}. Entre em contato conosco para regularizar sua situação.`
  };

  return mensagens[tipo];
};

export const formatarMensagemContrato = (
  nome: string,
  dataVencimento: Date,
  tipo: 'renovacao' | 'vencimento'
): string => {
  const dataFormatada = format(dataVencimento, "dd 'de' MMMM", { locale: ptBR });
  
  const mensagens = {
    renovacao: `Olá ${nome}, seu contrato está próximo da data de renovação (${dataFormatada}). Entre em contato para discutirmos os termos da renovação.`,
    vencimento: `Olá ${nome}, seu contrato vence em ${dataFormatada}. Por favor, entre em contato para evitar interrupção do serviço.`
  };

  return mensagens[tipo];
};