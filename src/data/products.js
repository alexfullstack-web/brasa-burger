/**
 * Catálogo de produtos.
 *
 * Para adicionar, remover ou alterar um item basta editar o array `products`.
 *  - hero:      número define a ordem no Hero (troca automática). Omita para não aparecer.
 *  - carousel:  true para aparecer no carrossel "Escolha seu favorito".
 *  - badge:     'MAIS PEDIDO' | 'NOVO' — aparece na seção "Os mais pedidos".
 *  - image:     use photo('nome') para fotos em /public/img (nome-480.webp, nome-900.webp, nome-full.webp)
 */

const photo = (key) => ({
  type: 'photo',
  src: `/img/${key}-900.webp`,
  small: `/img/${key}-480.webp`,
  full: `/img/${key}-full.webp`,
});

export const categories = [
  { id: 'burgers', label: 'Hambúrgueres' },
  { id: 'combos', label: 'Combos' },
  { id: 'porcoes', label: 'Porções' },
  { id: 'bebidas', label: 'Bebidas' },
  { id: 'sobremesas', label: 'Sobremesas' },
];

export const products = [
  // ───────────── HAMBÚRGUERES ─────────────
  {
    id: 'classic',
    name: 'Classic Burger',
    heroName: 'Burger Classic',
    category: 'burgers',
    price: 24.9,
    description: 'Carne artesanal, queijo cheddar, alface, tomate e molho especial.',
    image: photo('classic'),
    hero: 1,
    carousel: true,
    badge: 'MAIS PEDIDO',
  },
  {
    id: 'bacon',
    name: 'Bacon Burger',
    heroName: 'Burger Bacon',
    category: 'burgers',
    price: 29.9,
    description: 'Carne artesanal, cheddar cremoso, bacon crocante e molho especial.',
    image: photo('bacon'),
    hero: 2,
    carousel: true,
    badge: 'MAIS PEDIDO',
  },
  {
    id: 'double',
    name: 'Double Burger',
    heroName: 'Burger Duplo',
    category: 'burgers',
    price: 34.9,
    description:
      'Dois hambúrgueres artesanais, cheddar duplo, cebola caramelizada e molho especial.',
    image: photo('double'),
    hero: 3,
    carousel: true,
    badge: 'MAIS PEDIDO',
  },
  {
    id: 'chicken',
    name: 'Chicken Crispy',
    heroName: 'Chicken Crispy',
    category: 'burgers',
    price: 27.9,
    description: 'Frango crocante, cheddar, alface e molho especial.',
    // TODO: substitua /public/img/chicken-*.webp pela foto real do Chicken Crispy
    image: photo('chicken'),
    hero: 4,
    carousel: true,
  },
  {
    id: 'bbq',
    name: 'BBQ Burger',
    category: 'burgers',
    price: 31.9,
    description: 'Dois blends, cheddar, picles, cebola crispy e barbecue defumado da casa.',
    image: photo('bbq'),
    carousel: true,
    badge: 'NOVO',
  },
  {
    id: 'triple-bacon',
    name: 'Triple Bacon',
    category: 'burgers',
    price: 38.9,
    description: 'Três carnes artesanais, cheddar triplo, muito bacon e maionese defumada.',
    image: photo('triple-bacon'),
  },
  {
    id: 'monster',
    name: 'Monster Egg',
    category: 'burgers',
    price: 42.9,
    description: 'Dois blends, ovo na chapa, bacon, cheddar, tomate, alface e molho especial.',
    image: photo('monster'),
  },

  // ───────────── COMBOS ─────────────
  {
    id: 'combo-classic',
    name: 'Combo Classic',
    category: 'combos',
    price: 39.9,
    description: 'Classic Burger + batata frita + refrigerante lata.',
    image: photo('classic'),
  },
  {
    id: 'combo-bacon',
    name: 'Combo Bacon',
    category: 'combos',
    price: 44.9,
    description: 'Bacon Burger + batata frita + refrigerante lata.',
    image: photo('bacon'),
  },
  {
    id: 'combo-double',
    name: 'Combo Duplo',
    category: 'combos',
    price: 49.9,
    description: 'Double Burger + batata frita + refrigerante lata.',
    image: photo('double'),
  },
  {
    id: 'combo-casal',
    name: 'Combo Casal',
    category: 'combos',
    price: 84.9,
    description: '2 burgers à escolha + porção de onion rings + 2 refrigerantes.',
    image: photo('monster'),
  },

  // ───────────── PORÇÕES ─────────────
  {
    id: 'batata',
    name: 'Batata Rústica',
    category: 'porcoes',
    price: 19.9,
    description: 'Batatas rústicas crocantes com páprica, ervas e maionese da casa.',
    image: photo('batata'),
  },
  {
    id: 'batata-cheddar',
    name: 'Batata Cheddar & Bacon',
    category: 'porcoes',
    price: 27.9,
    description: 'Batata frita coberta com cheddar cremoso e bacon crocante.',
    image: photo('batata-cheddar'),
  },
  {
    id: 'onion-rings',
    name: 'Onion Rings',
    category: 'porcoes',
    price: 22.9,
    description: 'Anéis de cebola empanados, sequinhos e crocantes, com molho barbecue.',
    image: photo('onion-rings'),
  },

  // ───────────── BEBIDAS ─────────────
  {
    id: 'refri',
    name: 'Refrigerante Lata',
    category: 'bebidas',
    price: 7.9,
    description: 'Coca-Cola, Guaraná ou Sprite — 350 ml, bem gelado.',
    image: photo('refri'),
  },
  {
    id: 'suco',
    name: 'Suco Natural',
    category: 'bebidas',
    price: 10.9,
    description: 'Laranja, limão ou maracujá — 400 ml, feito na hora.',
    image: photo('suco'),
  },
  {
    id: 'milkshake',
    name: 'Milkshake',
    category: 'bebidas',
    price: 18.9,
    description: 'Chocolate, morango ou ovomaltine com chantilly — 400 ml.',
    image: photo('milkshake'),
  },

  // ───────────── SOBREMESAS ─────────────
  {
    id: 'brownie',
    name: 'Brownie com Sorvete',
    category: 'sobremesas',
    price: 19.9,
    description: 'Brownie de chocolate meio amargo, sorvete de creme e calda quente.',
    image: photo('brownie'),
  },
  {
    id: 'sundae',
    name: 'Taça de Doce de Leite',
    category: 'sobremesas',
    price: 15.9,
    description: 'Creme de doce de leite, chantilly, canela e physalis.',
    image: photo('taca-doce'),
  },
];

/* ───────────── Seletores prontos ───────────── */
export const heroProducts = products
  .filter((p) => p.hero)
  .sort((a, b) => a.hero - b.hero);

export const carouselProducts = products.filter((p) => p.carousel);

export const popularProducts = products.filter((p) => p.badge);

export const getProduct = (id) => products.find((p) => p.id === id);

/* ───────────── Monte seu combo ───────────── */
export const COMBO_BASE = 15; // valor adicionado ao burger (batata + refri). Classic: 24,90 + 15 = 39,90

export const comboSides = [
  { id: 'fries', name: 'Batata Rústica', extra: 0, image: photo('batata') },
  { id: 'rings', name: 'Onion Rings', extra: 4, image: photo('onion-rings') },
];

export const comboDrinks = [
  { id: 'soda', name: 'Refrigerante', extra: 0, image: photo('refri') },
  { id: 'juice', name: 'Suco Natural', extra: 3, image: photo('suco') },
  { id: 'shake', name: 'Milkshake', extra: 9, image: photo('milkshake') },
];
