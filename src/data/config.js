/**
 * Configurações gerais da hamburgueria.
 * Altere aqui nome, WhatsApp, Instagram, endereço e horários — o site inteiro usa estes dados.
 */
export const STORE = {
  name: 'Brasa Burger Co.',
  slogan: 'Hambúrguer artesanal feito na brasa.',
  // Somente números, com DDI + DDD (ex.: 55 + 11 + número)
  whatsapp: '5511999999999',
  defaultMessage: 'Olá! Gostaria de fazer um pedido.',
  instagram: 'brasaburger.co',
  phone: '(11) 99999-9999',
  address: 'Rua das Brasas, 123 — Centro, São Paulo/SP',
  mapsUrl: 'https://maps.google.com/?q=Rua+das+Brasas+123+Sao+Paulo',
  hours: [
    { days: 'Terça a Quinta', time: '18h às 23h' },
    { days: 'Sexta e Sábado', time: '18h às 00h' },
    { days: 'Domingo', time: '18h às 22h30' },
    { days: 'Segunda', time: 'Fechado' },
  ],
};

export const NAV_LINKS = [
  { label: 'Início', hash: '#inicio' },
  { label: 'Cardápio', hash: '#cardapio' },
  { label: 'Combos', hash: '#combos' },
  { label: 'Sobre', hash: '#sobre' },
  { label: 'Contato', hash: '#contato' },
];

export const whatsappLink = (message = STORE.defaultMessage) =>
  `https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(message)}`;

export const instagramLink = () => `https://instagram.com/${STORE.instagram}`;

const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
export const formatPrice = (value) => brl.format(value).replace(/ /g, ' ');
