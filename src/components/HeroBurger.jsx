import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductImage from './ProductImage.jsx';
import { ArrowLeft, ArrowRight, FlameIcon } from './Icons.jsx';
import { heroProducts } from '../data/products.js';
import { formatPrice } from '../data/config.js';
import { useCart } from '../context/CartContext.jsx';
import './HeroBurger.css';

const INTERVAL = 4000; // troca automática a cada 4s
const EXIT_DURATION = 750;

// Partículas de luz (posições fixas para não mudar a cada render)
const PARTICLES = [
  { x: 12, d: 0, s: 3, t: 7 }, { x: 22, d: 2.4, s: 2, t: 9 }, { x: 34, d: 4.1, s: 4, t: 8 },
  { x: 46, d: 1.2, s: 2, t: 10 }, { x: 58, d: 3.3, s: 3, t: 7.5 }, { x: 68, d: 5.2, s: 2, t: 9.5 },
  { x: 78, d: 0.8, s: 3, t: 8.5 }, { x: 88, d: 2.9, s: 2, t: 10 }, { x: 28, d: 6, s: 2, t: 9 },
  { x: 72, d: 6.6, s: 3, t: 8 },
];

export default function HeroBurger() {
  const [index, setIndex] = useState(0);
  const [prev, setPrev] = useState(null);
  const [paused, setPaused] = useState(false);
  const [hasChanged, setHasChanged] = useState(false); // após a 1ª troca usa a animação de entrada lateral
  const { addItem } = useCart();
  const total = heroProducts.length;
  const current = heroProducts[index];

  const goTo = useCallback(
    (target) => {
      const next = (target + total) % total;
      if (next === index) return;
      setPrev(index);
      setIndex(next);
      setHasChanged(true);
    },
    [index, total]
  );

  // autoplay — reinicia o tempo a cada troca (manual ou automática)
  useEffect(() => {
    if (paused || total < 2) return;
    const t = setTimeout(() => goTo(index + 1), INTERVAL);
    return () => clearTimeout(t);
  }, [index, paused, goTo, total]);

  // remove a camada que está saindo após a animação
  useEffect(() => {
    if (prev === null) return;
    const t = setTimeout(() => setPrev(null), EXIT_DURATION);
    return () => clearTimeout(t);
  }, [prev, index]);

  // pré-carrega as próximas imagens
  useEffect(() => {
    heroProducts.forEach((p) => {
      const img = new Image();
      img.src = p.image.src;
    });
  }, []);

  const order = () => addItem({ id: current.id, name: current.name, price: current.price, image: current.image }, { open: true });

  return (
    <section id="inicio" className="hero">
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__glow hero__glow--a" />
        <div className="hero__glow hero__glow--b" />
        <div className="hero__grain" />
      </div>

      <div className="container hero__grid">
        {/* Texto */}
        <div className="hero__copy">
          <span className="eyebrow hero__eyebrow">
            <FlameIcon width={16} height={16} /> Hambúrguer artesanal na brasa
          </span>
          <h1 className="hero__title">
            O sabor que <br className="hide-sm" />
            você <span className="text-gradient">merece.</span>
          </h1>
          <p className="hero__text">
            Hambúrguer artesanal preparado com ingredientes selecionados, carne suculenta e muito sabor.
          </p>
        </div>

        {/* Hambúrguer em destaque */}
        <div
          className="hero__stage"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          aria-roledescription="carrossel"
          aria-label="Destaques da casa"
        >
          <div className="hero__visual">
            <div className="hero__ring" aria-hidden="true" />
            <div className="hero__halo" aria-hidden="true" />
            <div className="hero__particles" aria-hidden="true">
              {PARTICLES.map((p, i) => (
                <span key={i} style={{ '--x': `${p.x}%`, '--d': `${p.d}s`, '--s': `${p.s}px`, '--t': `${p.t}s` }} />
              ))}
            </div>

            <div className="hero__float">
              {prev !== null && (
                <div className="hero__burger hero__burger--exit" key={`exit-${prev}`} aria-hidden="true">
                  <ProductImage image={heroProducts[prev].image} alt="" eager sizes="(min-width: 1024px) 560px, 86vw" />
                </div>
              )}
              <div className={`hero__burger ${hasChanged ? 'hero__burger--enter' : 'hero__burger--intro'}`} key={`cur-${index}`}>
                <ProductImage image={current.image} alt={current.name} eager sizes="(min-width: 1024px) 560px, 86vw" />
              </div>
            </div>
            <div className="hero__shadow" aria-hidden="true" />
          </div>

          <div className="hero__product" aria-live="polite">
            <div className="hero__product-text" key={`txt-${index}`}>
              <span className="hero__counter">
                {String(index + 1).padStart(2, '0')} <i>/ {String(total).padStart(2, '0')}</i>
              </span>
              <h2 className="hero__name">{current.heroName || current.name}</h2>
              <p className="hero__desc">{current.description}</p>
            </div>
            <div className="hero__price" key={`price-${index}`}>
              <small>a partir de</small>
              <strong>{formatPrice(current.price)}</strong>
            </div>
          </div>

          <div className="hero__controls">
            <button type="button" className="icon-btn icon-btn--outline" onClick={() => goTo(index - 1)} aria-label="Hambúrguer anterior">
              <ArrowLeft />
            </button>
            <div className="dots" role="tablist" aria-label="Escolher hambúrguer">
              {heroProducts.map((p, i) => (
                <button
                  key={`${p.id}-${paused}`}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={p.heroName || p.name}
                  className={`dot ${i === index ? 'is-active' : ''} ${paused ? 'is-paused' : ''}`}
                  style={{ '--duration': `${INTERVAL}ms` }}
                  onClick={() => goTo(i)}
                />
              ))}
            </div>
            <button type="button" className="icon-btn icon-btn--outline" onClick={() => goTo(index + 1)} aria-label="Próximo hambúrguer">
              <ArrowRight />
            </button>
          </div>
        </div>

        {/* Botões */}
        <div className="hero__actions">
          <button type="button" className="btn btn--primary btn--lg" onClick={order}>
            Pedir agora
          </button>
          <Link to={{ pathname: '/', hash: '#cardapio' }} className="btn btn--ghost btn--lg">
            Ver cardápio
          </Link>
          <ul className="hero__perks">
            <li>Blend 100% bovino</li>
            <li>Pão brioche</li>
            <li>Feito na hora</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
