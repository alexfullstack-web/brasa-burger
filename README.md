# Brasa Burger Co. — site da hamburgueria

React 18 + Vite 5 + React Router 6 · JavaScript (sem TypeScript) · CSS puro, mobile first.

## Rodar

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # gera /dist
npm run preview   # testa o build
```

## Onde editar

| O quê | Arquivo |
|---|---|
| Nome, WhatsApp, Instagram, endereço, horários | `src/data/config.js` |
| Produtos, preços, categorias, Hero, carrossel, selos | `src/data/products.js` |
| Depoimentos e posts do Instagram | `src/data/content.js` |
| Cores, fontes, botões | `src/styles/global.css` (variáveis em `:root`) |

### Produtos
Cada item do array `products` aceita:
- `hero: 1..n` → entra na troca automática do Hero (na ordem do número)
- `carousel: true` → aparece em "Escolha seu favorito"
- `badge: 'MAIS PEDIDO' | 'NOVO'` → aparece em "Os mais pedidos"
- `image: photo('nome')` → usa `/public/img/nome-480.webp`, `nome-900.webp`, `nome-full.webp`

### Fotos
Fotos novas: exporte em WebP quadrado (900×900 e 480×480) e uma versão maior (`-full`, até 1400px).

## Antes de publicar
- [ ] Trocar o número de WhatsApp em `config.js` (`5511999999999` é exemplo)
- [ ] Substituir `/public/img/chicken-*.webp` pela foto real do Chicken Crispy (hoje é uma foto provisória)
- [ ] Trocar os depoimentos de exemplo por avaliações reais
- [ ] Ajustar endereço, horários, @ do Instagram e o logo (`src/components/Logo.jsx`)

## Estrutura

```
src/
  components/   Header, HeroBurger, BurgerCarousel, PopularProducts, Menu, Combos,
                About, Testimonials, Instagram, CTA, Footer, WhatsAppButton,
                Carousel (genérico), ProductCard, CartDrawer, Toast, Reveal...
  context/      CartContext — carrinho + mensagem pronta para o WhatsApp
  data/         config.js, products.js, content.js
  hooks/        useInView (animações no scroll), usePerView (cards por tela)
  pages/        Home, MenuPage (/cardapio), NotFound
  styles/       global.css
```

## Deploy
SPA com React Router: `vercel.json` (Vercel) e `public/_redirects` (Netlify) já fazem todas as rotas apontarem para o `index.html`.
