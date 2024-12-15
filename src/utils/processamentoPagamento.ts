import { Pagamento, StatusPagamento } from '../types';

export interface DadosPagamento {
  contratoId: string;
  valor: number;
  metodoPagamento: 'pix' | 'cartao' | 'boleto';
  detalhes?: {
    numeroCartao?: string;
    codigoPix?: string;
    codigoBoleto?: string;
  };
}

export const processarPagamento = async (dados: DadosPagamento): Promise<Pagamento> => {
  // Simulação de processamento de pagamento
  // Em produção, isso se conectaria a um gateway de pagamento real
  return new Promise((resolve) => {
    setTimeout(() => {
      const pagamento: Pagamento = {
        id: Math.random().toString(36).substr(2, 9),
        contratoId: dados.contratoId,
        valor: dados.valor,
        dataVencimento: new Date(),
        dataPagamento: new Date(),
        status: 'pago'
      };
      resolve(pagamento);
    }, 1000);
  });
};

export const gerarCobranca = async (
  contratoId: string,
  valor: number,
  dataVencimento: Date
): Promise<string> => {
  // Simulação de geração de cobrança
  // Em produção, isso geraria uma cobrança real no sistema de pagamentos
  return new Promise((resolve) => {
    setTimeout(() => {
      const codigoCobranca = Math.random().toString(36).substr(2, 9);
      resolve(codigoCobranca);
    }, 500);
  });
};

export const verificarStatusPagamento = async (
  codigoCobranca: string
): Promise<StatusPagamento> => {
  // Simulação de verificação de status
  // Em produção, isso consultaria o status real no sistema de pagamentos
  return new Promise((resolve) => {
    setTimeout(() => {
      const status: StatusPagamento = Math.random() > 0.5 ? 'pago' : 'pendente';
      resolve(status);
    }, 500);
  });
};