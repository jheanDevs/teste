import { Imovel, Contrato, Pagamento } from '../types';
import { formatarMoeda } from './formatadores';

export interface RelatorioMensal {
  mes: string;
  receitaTotal: number;
  pagamentosPendentes: number;
  pagamentosAtrasados: number;
  taxaOcupacao: number;
}

export interface RelatorioImovel {
  imovelId: string;
  endereco: string;
  receitaTotal: number;
  ocupacaoMeses: number;
  manutencoesMeses: number;
}

export const gerarRelatorioMensal = (
  imoveis: Imovel[],
  contratos: Contrato[],
  pagamentos: Pagamento[],
  mes: Date
): RelatorioMensal => {
  const inicio = new Date(mes.getFullYear(), mes.getMonth(), 1);
  const fim = new Date(mes.getFullYear(), mes.getMonth() + 1, 0);

  const pagamentosMes = pagamentos.filter(p => 
    p.dataVencimento >= inicio && p.dataVencimento <= fim
  );

  const receitaTotal = pagamentosMes
    .filter(p => p.status === 'pago')
    .reduce((total, p) => total + p.valor, 0);

  const pendentes = pagamentosMes.filter(p => p.status === 'pendente').length;
  const atrasados = pagamentosMes.filter(p => p.status === 'atrasado').length;

  const imoveisOcupados = imoveis.filter(i => i.status === 'ocupado').length;
  const taxaOcupacao = (imoveisOcupados / imoveis.length) * 100;

  return {
    mes: inicio.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }),
    receitaTotal,
    pagamentosPendentes: pendentes,
    pagamentosAtrasados: atrasados,
    taxaOcupacao
  };
};

export const gerarRelatorioImovel = (
  imovel: Imovel,
  contratos: Contrato[],
  pagamentos: Pagamento[],
  periodo: { inicio: Date; fim: Date }
): RelatorioImovel => {
  const contratosImovel = contratos.filter(c => c.imovelId === imovel.id);
  const pagamentosContratos = pagamentos.filter(p => 
    contratosImovel.some(c => c.id === p.contratoId)
  );

  const receitaTotal = pagamentosContratos
    .filter(p => p.status === 'pago')
    .reduce((total, p) => total + p.valor, 0);

  // Calcular meses de ocupação e manutenção
  let mesesOcupado = 0;
  let mesesManutencao = 0;

  // Lógica para calcular os meses...

  return {
    imovelId: imovel.id,
    endereco: imovel.endereco,
    receitaTotal,
    ocupacaoMeses: mesesOcupado,
    manutencoesMeses: mesesManutencao
  };
};