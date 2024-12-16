import React, { useState } from 'react';
import { Mail, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';

export default function Suporte() {
  const [metodoContato, setMetodoContato] = useState<'email' | 'whatsapp' | null>(null);

  const contatoEmail = 'suporte@propmanager.com';
  const contatoWhatsApp = '+5586994388256';

  const handleContatoClick = (tipo: 'email' | 'whatsapp') => {
    if (tipo === 'email') {
      window.location.href = `mailto:${contatoEmail}`;
    } else {
      window.open(`https://wa.me/${contatoWhatsApp}?text=Olá, gostaria de solicitar acesso ao sistema.`, '_blank');
    }
    setMetodoContato(tipo);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sm:mx-auto sm:w-full sm:max-w-md"
      >
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Solicitar Acesso
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Escolha como deseja entrar em contato com nossa equipe
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
      >
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-6">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={() => handleContatoClick('whatsapp')}
                className="w-full flex justify-center items-center space-x-2"
                variant="primary"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Contato via WhatsApp</span>
              </Button>
            </motion.div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  ou
                </span>
              </div>
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={() => handleContatoClick('email')}
                className="w-full flex justify-center items-center space-x-2"
                variant="secondary"
              >
                <Mail className="w-5 h-5" />
                <span>Contato via Email</span>
              </Button>
            </motion.div>
          </div>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Nossa equipe responderá em até 24 horas úteis</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-8 text-center text-sm text-gray-600"
      >
        <p>© 2024 PropManager. Todos os direitos reservados.</p>
      </motion.div>
    </div>
  );
}