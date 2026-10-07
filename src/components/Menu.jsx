import { useLayoutEffect, useRef, useState } from 'react';
import SectionTitle from './SectionTitle.jsx';
import ProductCard from './ProductCard.jsx';
import { categories, products } from '../data/products.js';
import './Menu.css';

export default function Menu({ standalone = false }) {
  const [active, setActive] = useState(categories[0].id);
  const tabsRef = useRef(null);
  const [pill, setPill] = useState({ left: 0, width: 0 });

  const items = products.filter((p) => p.category === active);

  // posiciona o indicador animado sob a aba ativa
  useLayoutEffect(() => {
    const update = () => {
      const el = tabsRef.current?.querySelector('[aria-selected="true"]');
      if (el) setPill({ left: el.offsetLeft, width: el.offsetWidth });
    };
    update();
    window.addEventListener('resize', update);
    document.fonts?.ready.then(update);
    return () => window.removeEventListener('resize', update);
  }, [active]);

  const select = (id, e) => {
    setActive(id);
    e.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  };

  return (
    <section id="cardapio" className="section menu" aria-labelledby="menu-title">
      <div className="container">
        <SectionTitle
          as={standalone ? 'h1' : 'h2'}
          eyebrow="Cardápio"
          title={<span id="menu-title">Nosso <span className="text-gradient">cardápio</span></span>}
          text="Escolha, adicione ao pedido e finalize direto pelo WhatsApp."
        />

        <div className="menu__tabs-wrap">
          <div className="menu__tabs" role="tablist" aria-label="Categorias do cardápio" ref={tabsRef}>
            <span className="menu__pill" style={{ transform: `translateX(${pill.left}px)`, width: pill.width }} aria-hidden="true" />
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                role="tab"
                id={`tab-${c.id}`}
                aria-selected={active === c.id}
                aria-controls="menu-panel"
                className={`menu__tab ${active === c.id ? 'is-active' : ''}`}
                onClick={(e) => select(c.id, e)}
              >
                {c.label}
                <span className="menu__count">{products.filter((p) => p.category === c.id).length}</span>
              </button>
            ))}
          </div>
        </div>

        <div id="menu-panel" role="tabpanel" aria-labelledby={`tab-${active}`} className="menu__grid">
          {items.map((p, i) => (
            <div key={`${active}-${p.id}`} className="menu__item" style={{ '--i': i }}>
              <ProductCard product={p} variant="menu" ctaLabel="Adicionar ao pedido" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
