import { useState, useEffect } from 'react';
import { TipoNotificacao } from '../services/notificacaoService';

interface Notificacao {
  id: string;
  tipo: TipoNotificacao;
  mensagem: string;
  lida: boolean;
  data: Date;
}

export default function useNotificacoes() {
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const buscarNotificacoes = async () => {
      try {
        // Aqui você faria a chamada à API para buscar as notificações
        // Simulando dados para exemplo
        const mockNotificacoes: Notificacao[] = [
          {
            id: '1',
            tipo: 'vencimento_pagamento',
            mensagem: 'Pagamento próximo ao vencimento',
            lida: false,
            data: new Date(),
          },
          {
            id: '2',
            tipo: 'renovacao_contrato',
            mensagem: 'Contrato próximo ao vencimento',
            lida: false,
            data: new Date(),
          },
        ];

        setNotificacoes(mockNotificacoes);
      } catch (error) {
        console.error('Erro ao buscar notificações:', error);
      } finally {
        setCarregando(false);
      }
    };

    buscarNotificacoes();
  }, []);

  const marcarComoLida = async (id: string) => {
    try {
      // Aqui você faria a chamada à API para marcar como lida
      setNotificacoes(prev =>
        prev.map(n => (n.id === id ? { ...n, lida: true } : n))
      );
    } catch (error) {
      console.error('Erro ao marcar notificação como lida:', error);
    }
  };

  const limparTodas = async () => {
    try {
      // Aqui você faria a chamada à API para limpar todas
      setNotificacoes([]);
    } catch (error) {
      console.error('Erro ao limpar notificações:', error);
    }
  };

  return {
    notificacoes,
    carregando,
    marcarComoLida,
    limparTodas,
    naoLidas: notificacoes.filter(n => !n.lida).length,
  };
}