import { Imovel, Inquilino, Contrato, Pagamento } from '../types';

export const filtrarImoveis = (imoveis: Imovel[], termo: string): Imovel[] => {
  const termoBusca = termo.toLowerCase();
  return imoveis.filter(imovel => 
    imovel.endereco.toLowerCase().includes(termoBusca) ||
    imovel.tipo.toLowerCase().includes(termoBusca)
  );
};

export const filtrarInquilinos = (inquilinos: Inquilino[], termo: string): Inquilino[] => {
  const termoBusca = termo.toLowerCase();
  return inquilinos.filter(inquilino => 
    inquilino.nome.toLowerCase().includes(termoBusca) ||
    inquilino.email.toLowerCase().includes(termoBusca) ||
    inquilino.cpf.includes(termo)
  );
};

export const filtrarContratos = (
  contratos: Contrato[],
  termo: string,
  filtros?: {
    status?: string[];
    dataInicio?: Date;
    dataFim?: Date;
  }
): Contrato[] => {
  let resultado = contratos;

  if (termo) {
    resultado = resultado.filter(contrato =>
      contrato.id.includes(termo) ||
      contrato.imovelId.includes(termo) ||
      contrato.inquilinoId.includes(termo)
    );
  }

  if (filtros?.status?.length) {
    resultado = resultado.filter(contrato =>
      filtros.status?.includes(contrato.status)
    );
  }

  if (filtros?.dataInicio) {
    resultado = resultado.filter(contrato =>
      contrato.dataInicio >= filtros.dataInicio!
    );
  }

  if (filtros?.dataFim) {
    resultado = resultado.filter(contrato =>
      contrato.dataFim <= filtros.dataFim!
    );
  }

  return resultado;
};

export const filtrarPagamentos = (
  pagamentos: Pagamento[],
  termo: string,
  filtros?: {
    status?: string[];
    dataInicio?: Date;
    dataFim?: Date;
  }
): Pagamento[] => {
  let resultado = pagamentos;

  if (termo) {
    resultado = resultado.filter(pagamento =>
      pagamento.id.includes(termo) ||
      pagamento.contratoId.includes(termo)
    );
  }

  if (filtros?.status?.length) {
    resultado = resultado.filter(pagamento =>
      filtros.status?.includes(pagamento.status)
    );
  }

  if (filtros?.dataInicio) {
    resultado = resultado.filter(pagamento =>
      pagamento.dataVencimento >= filtros.dataInicio!
    );
  }

  if (filtros?.dataFim) {
    resultado = resultado.filter(pagamento =>
      pagamento.dataVencimento <= filtros.dataFim!
    );
  }

  return resultado;
};