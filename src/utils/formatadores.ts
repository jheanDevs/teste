export const formatarCPF = (cpf: string): string => {
  const limpo = cpf.replace(/\D/g, '');
  if (limpo.length !== 11) return cpf;
  return limpo.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

export const formatarTelefone = (telefone: string): string => {
  const limpo = telefone.replace(/\D/g, '');
  if (limpo.length !== 11) return telefone;
  return limpo.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
};

export const formatarMoeda = (valor: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(valor);
};

export const formatarData = (data: Date): string => {
  return new Intl.DateTimeFormat('pt-BR').format(data);
};