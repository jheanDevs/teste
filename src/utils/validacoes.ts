export const validarCPF = (cpf: string): boolean => {
  const cpfLimpo = cpf.replace(/\D/g, '');
  
  if (cpfLimpo.length !== 11) return false;
  
  // Implementar validação completa do CPF aqui
  return true;
};

export const validarEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validarTelefone = (telefone: string): boolean => {
  const telefoneLimpo = telefone.replace(/\D/g, '');
  return telefoneLimpo.length >= 10 && telefoneLimpo.length <= 11;
};

export const validarCEP = (cep: string): boolean => {
  const cepLimpo = cep.replace(/\D/g, '');
  return cepLimpo.length === 8;
};