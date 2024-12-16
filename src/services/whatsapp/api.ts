import { whatsappConfig } from './config';
import { templates } from './templates';

interface EnviarMensagemProps {
  telefone: string;
  template: keyof typeof templates;
  parametros: string[];
}

export const enviarMensagem = async ({
  telefone,
  template,
  parametros
}: EnviarMensagemProps): Promise<void> => {
  try {
    const url = `${whatsappConfig.baseUrl}/${whatsappConfig.phoneNumberId}/messages`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${whatsappConfig.accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: telefone,
        type: 'template',
        template: {
          name: templates[template].name,
          language: {
            code: whatsappConfig.defaultLanguage
          },
          components: templates[template].components.map(component => ({
            ...component,
            parameters: component.parameters.map((param, index) => ({
              ...param,
              text: parametros[index]
            }))
          }))
        }
      })
    });

    if (!response.ok) {
      throw new Error('Falha ao enviar mensagem WhatsApp');
    }

    console.log('Mensagem WhatsApp enviada com sucesso');
  } catch (error) {
    console.error('Erro ao enviar mensagem WhatsApp:', error);
    throw error;
  }
};