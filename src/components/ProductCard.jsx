import ProductImage from './ProductImage.jsx';
import { PlusIcon } from './Icons.jsx';
import { formatPrice } from '../data/config.js';
import { useCart } from '../context/CartContext.jsx';
import './ProductCard.css';

/**
 * Card de produto reutilizável.
 * variant: 'feature' (carrossel / mais pedidos — imagem grande) | 'menu' (cardápio — compacto)
 */
export default function ProductCard({ product, variant = 'feature', badge, ctaLabel = 'Pedir', style }) {
  const { addItem } = useCart();
  const add = () => addItem({ id: product.id, name: product.name, price: product.price, image: product.image });

  return (
    <article className={`pcard pcard--${variant}`} style={style}>
      <div className={`pcard__media ${product.image?.type === 'art' ? 'pcard__media--art' : ''}`}>
        <ProductImage image={product.image} alt={product.name} />
        {badge && <span className={`badge ${badge === 'NOVO' ? 'badge--new' : ''}`}>{badge}</span>}
      </div>
      <div className="pcard__body">
        <h3 className="pcard__name">{product.name}</h3>
        <p className="pcard__desc">{product.description}</p>
        <div className="pcard__footer">
          <span className="pcard__price">{formatPrice(product.price)}</span>
          <button type="button" className="btn btn--primary btn--sm pcard__btn" onClick={add}>
            {variant === 'menu' && <PlusIcon width={16} height={16} />}
            {ctaLabel}
          </button>
        </div>
      </div>
    </article>
  );
}
