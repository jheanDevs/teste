import { format, isAfter, isBefore, addDays, addMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const formatarData = (data: Date): string => {
  return format(data, 'dd/MM/yyyy', { locale: ptBR });
};

export const formatarDataCompleta = (data: Date): string => {
  return format(data, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
};

export const calcularDiasAteVencimento = (dataVencimento: Date): number => {
  const hoje = new Date();
  const diffTime = dataVencimento.getTime() - hoje.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const verificarVencimentoProximo = (
  dataVencimento: Date,
  diasAntecedencia: number = 5
): boolean => {
  const hoje = new Date();
  const limiteAlerta = addDays(hoje, diasAntecedencia);
  return isAfter(dataVencimento, hoje) && isBefore(dataVencimento, limiteAlerta);
};