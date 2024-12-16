export const templates = {
  lembretePagamento: {
    name: 'lembrete_pagamento',
    components: [
      {
        type: 'body',
        parameters: [
          { type: 'text', text: '{{1}}' }, // Nome
          { type: 'text', text: '{{2}}' }, // Valor
          { type: 'text', text: '{{3}}' }  // Data
        ]
      }
    ]
  },
  pagamentoVencido: {
    name: 'pagamento_vencido',
    components: [
      {
        type: 'body',
        parameters: [
          { type: 'text', text: '{{1}}' }, // Nome
          { type: 'text', text: '{{2}}' }, // Valor
          { type: 'text', text: '{{3}}' }  // Data
        ]
      }
    ]
  },
  renovacaoContrato: {
    name: 'renovacao_contrato',
    components: [
      {
        type: 'body',
        parameters: [
          { type: 'text', text: '{{1}}' }, // Nome
          { type: 'text', text: '{{2}}' }  // Data
        ]
      }
    ]
  }
};