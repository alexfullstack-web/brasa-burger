import SectionTitle from './SectionTitle.jsx';
import Reveal from './Reveal.jsx';
import ProductImage from './ProductImage.jsx';
import { popularProducts } from '../data/products.js';
import { formatPrice } from '../data/config.js';
import { useCart } from '../context/CartContext.jsx';
import './PopularProducts.css';

export default function PopularProducts() {
  const { addItem } = useCart();

  return (
    <section className="section popular" aria-labelledby="popular-title">
      <div className="container">
        <SectionTitle
          eyebrow="Top da galera"
          title={<span id="popular-title">Os mais <span className="text-gradient">pedidos</span></span>}
        />

        <div className="popular__grid">
          {popularProducts.map((p, i) => (
            <Reveal key={p.id} delay={i * 90} as="article" className="popular__card">
              <span className="popular__rank" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <div className="popular__media">
                <ProductImage image={p.image} alt={p.name} sizes="(min-width: 900px) 220px, 40vw" />
              </div>
              <div className="popular__body">
                <span className={`badge ${p.badge === 'NOVO' ? 'badge--new' : ''}`}>{p.badge}</span>
                <h3 className="popular__name">🍔 {p.name.replace(' Burger', '')}</h3>
                <p className="popular__desc">{p.description}</p>
                <div className="popular__footer">
                  <strong className="popular__price">{formatPrice(p.price)}</strong>
                  <button
                    type="button"
                    className="btn btn--outline btn--sm"
                    onClick={() => addItem({ id: p.id, name: p.name, price: p.price, image: p.image })}
                  >
                    Adicionar
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
