export const whatsappConfig = {
  baseUrl: process.env.WHATSAPP_API_URL || 'https://graph.facebook.com/v13.0',
  phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID,
  accessToken: process.env.WHATSAPP_ACCESS_TOKEN,
  templateNamespace: process.env.WHATSAPP_TEMPLATE_NAMESPACE,
  defaultLanguage: 'pt_BR'
};