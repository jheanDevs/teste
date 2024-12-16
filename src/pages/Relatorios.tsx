import React, { useState } from 'react';
import { FileText, Download, FileSpreadsheet } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { RelatorioFiltros, gerarRelatorioPDF, gerarRelatorioExcel } from '../services/relatorioService';

export default function Relatorios() {
  const [filtros, setFiltros] = useState<RelatorioFiltros>({
    tipoRelatorio: 'pagamentos',
    dataInicio: undefined,
    dataFim: undefined,
    status: []
  });

  const handleGerarRelatorio = async (formato: 'pdf' | 'excel') => {
    try {
      // Simular dados do relatório
      const dados = [
        { id: 1, valor: 1000, status: 'pago' },
        { id: 2, valor: 1500, status: 'pendente' }
      ];

      let blob;
      let fileName;

      if (formato === 'pdf') {
        blob = await gerarRelatorioPDF(dados, filtros);
        fileName = 'relatorio.pdf';
      } else {
        blob = await gerarRelatorioExcel(dados, filtros);
        fileName = 'relatorio.xlsx';
      }

      // Download do arquivo
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Erro ao gerar relatório:', error);
    }
  };

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold text-gray-900">Relatórios</h1>
        <p className="text-gray-600">Gere relatórios detalhados do sistema</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Card className="p-6">
            <div className="flex flex-col space-y-4">
              <FileText className="w-8 h-8 text-blue-600" />
              <h3 className="text-lg font-semibold">Relatório de Pagamentos</h3>
              <p className="text-gray-600">Visualize todos os pagamentos e suas situações</p>
              <div className="flex space-x-2">
                <Button
                  onClick={() => handleGerarRelatorio('pdf')}
                  variant="primary"
                  className="flex items-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>PDF</span>
                </Button>
                <Button
                  onClick={() => handleGerarRelatorio('excel')}
                  variant="secondary"
                  className="flex items-center space-x-2"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Excel</span>
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Adicione mais cards para outros tipos de relatórios */}
      </div>
    </div>
  );
}