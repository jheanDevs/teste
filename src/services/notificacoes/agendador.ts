import { verificarVencimentoProximo } from '../../utils/datas';
import { enviarMensagem } from '../whatsapp/api';
import { Pagamento, Contrato } from '../../types';

export const verificarNotificacoesPendentes = async (
  pagamentos: Pagamento[],
  contratos: Contrato[]
): Promise<void> => {
  // Verifica pagamentos próximos ao vencimento
  const pagamentosPendentes = pagamentos.filter(pagamento => 
    verificarVencimentoProximo(pagamento.dataVencimento)
  );

  // Verifica contratos próximos ao vencimento
  const contratosVencendo = contratos.filter(contrato =>
    verificarVencimentoProximo(contrato.dataFim, 30)
  );

  // Envia notificações
  for (const pagamento of pagamentosPendentes) {
    await enviarMensagem({
      telefone: pagamento.inquilino.telefone,
      template: 'lembretePagamento',
      parametros: [
        pagamento.inquilino.nome,
        pagamento.valor.toString(),
        pagamento.dataVencimento.toLocaleDateString()
      ]
    });
  }

  for (const contrato of contratosVencendo) {
    await enviarMensagem({
      telefone: contrato.inquilino.telefone,
      template: 'renovacaoContrato',
      parametros: [
        contrato.inquilino.nome,
        contrato.dataFim.toLocaleDateString()
      ]
    });
  }
};