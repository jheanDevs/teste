export interface Usuario {
  id: string;
  nome: string;
  email: string;
  tipo: 'admin' | 'proprietario';
  empresa?: string;
  telefone?: string;
}

export interface DadosLogin {
  email: string;
  senha: string;
}

export interface DadosCadastro extends DadosLogin {
  nome: string;
  tipo: 'admin' | 'proprietario';
  empresa?: string;
  telefone?: string;
}