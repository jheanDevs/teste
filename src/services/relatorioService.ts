import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Pagamento, Contrato, Imovel } from '../types';

export interface RelatorioFiltros {
  dataInicio?: Date;
  dataFim?: Date;
  tipoRelatorio: 'pagamentos' | 'contratos' | 'imoveis';
  status?: string[];
}

export const gerarRelatorioPDF = async (
  dados: any[],
  filtros: RelatorioFiltros
): Promise<Blob> => {
  const doc = new jsPDF();
  
  // Cabeçalho
  doc.setFontSize(16);
  doc.text('Relatório', 20, 20);
  
  // Data do relatório
  doc.setFontSize(10);
  doc.text(`Gerado em: ${format(new Date(), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}`, 20, 30);
  
  // Dados do relatório
  let y = 40;
  dados.forEach((item, index) => {
    if (y > 280) {
      doc.addPage();
      y = 20;
    }
    
    doc.setFontSize(10);
    doc.text(JSON.stringify(item), 20, y);
    y += 10;
  });
  
  return doc.output('blob');
};

export const gerarRelatorioExcel = async (
  dados: any[],
  filtros: RelatorioFiltros
): Promise<Blob> => {
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(dados);
  
  XLSX.utils.book_append_sheet(wb, ws, 'Relatório');
  
  const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  return new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
};