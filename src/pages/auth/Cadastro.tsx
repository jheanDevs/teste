import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2 } from 'lucide-react';
import Button from '../../components/ui/Button';
import { DadosCadastro } from '../../types/auth';

export default function Cadastro() {
  const navigate = useNavigate();
  const [dados, setDados] = useState<DadosCadastro>({
    nome: '',
    email: '',
    senha: '',
    tipo: 'proprietario',
    empresa: '',
    telefone: ''
  });
  const [erro, setErro] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    
    try {
      // Simulação de cadastro - substituir por chamada real à API
      if (dados.email && dados.senha && dados.nome) {
        // Simular delay de rede
        await new Promise(resolve => setTimeout(resolve, 1000));
        navigate('/login');
      } else {
        setErro('Por favor, preencha todos os campos obrigatórios');
      }
    } catch (error) {
      setErro('Erro ao criar conta. Tente novamente.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Building2 className="w-12 h-12 text-blue-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Criar nova conta
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
                Nome completo
              </label>
              <input
                id="nome"
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={dados.nome}
                onChange={(e) => setDados({ ...dados, nome: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={dados.email}
                onChange={(e) => setDados({ ...dados, email: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="senha" className="block text-sm font-medium text-gray-700">
                Senha
              </label>
              <input
                id="senha"
                type="password"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={dados.senha}
                onChange={(e) => setDados({ ...dados, senha: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="tipo" className="block text-sm font-medium text-gray-700">
                Tipo de conta
              </label>
              <select
                id="tipo"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={dados.tipo}
                onChange={(e) => setDados({ ...dados, tipo: e.target.value as 'admin' | 'proprietario' })}
              >
                <option value="proprietario">Proprietário</option>
                <option value="admin">Administrador</option>
              </select>
            </div>

            <div>
              <label htmlFor="empresa" className="block text-sm font-medium text-gray-700">
                Empresa (opcional)
              </label>
              <input
                id="empresa"
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={dados.empresa}
                onChange={(e) => setDados({ ...dados, empresa: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="telefone" className="block text-sm font-medium text-gray-700">
                Telefone (opcional)
              </label>
              <input
                id="telefone"
                type="tel"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={dados.telefone}
                onChange={(e) => setDados({ ...dados, telefone: e.target.value })}
              />
            </div>

            {erro && (
              <div className="text-red-600 text-sm">{erro}</div>
            )}

            <div>
              <Button type="submit" className="w-full">
                Criar conta
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}