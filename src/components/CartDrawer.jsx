import { useEffect, useRef, useState } from 'react';
import ProductImage from './ProductImage.jsx';
import { CartIcon, CloseIcon, MinusIcon, PlusIcon, TrashIcon, WhatsAppIcon } from './Icons.jsx';
import { formatPrice } from '../data/config.js';
import { useCart } from '../context/CartContext.jsx';
import './CartDrawer.css';

export default function CartDrawer() {
  const { items, total, count, isOpen, closeCart, updateQty, clear, checkoutLink } = useCart();
  const [note, setNote] = useState('');
  const closeRef = useRef(null);

  useEffect(() => {
    document.body.classList.toggle('no-scroll', isOpen);
    if (!isOpen) return;
    closeRef.current?.focus();
    const onKey = (e) => e.key === 'Escape' && closeCart();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, closeCart]);

  return (
    <div className={`cart ${isOpen ? 'is-open' : ''}`} aria-hidden={!isOpen} inert={!isOpen ? '' : undefined}>
      <div className="cart__overlay" onClick={closeCart} />
      <aside className="cart__panel" role="dialog" aria-modal="true" aria-label="Seu pedido">
        <header className="cart__header">
          <h2>
            Seu pedido <span>({count})</span>
          </h2>
          <button ref={closeRef} type="button" className="icon-btn" onClick={closeCart} aria-label="Fechar pedido">
            <CloseIcon />
          </button>
        </header>

        {items.length === 0 ? (
          <div className="cart__empty">
            <span className="cart__empty-icon">
              <CartIcon width={34} height={34} />
            </span>
            <p>Seu pedido está vazio.</p>
            <small>Escolha seus favoritos no cardápio e eles aparecem aqui.</small>
            <button type="button" className="btn btn--outline" onClick={closeCart}>
              Ver cardápio
            </button>
          </div>
        ) : (
          <>
            <ul className="cart__list">
              {items.map((item) => (
                <li key={item.id} className="cart__item">
                  <div className={`cart__thumb ${item.image?.type === 'art' ? 'cart__thumb--art' : ''}`}>
                    <ProductImage image={item.image} alt="" sizes="72px" />
                  </div>
                  <div className="cart__info">
                    <strong>{item.name}</strong>
                    {item.details && <small>{item.details}</small>}
                    <span className="cart__price">{formatPrice(item.price * item.qty)}</span>
                  </div>
                  <div className="cart__qty">
                    <button type="button" onClick={() => updateQty(item.id, -1)} aria-label={`Diminuir ${item.name}`}>
                      {item.qty === 1 ? <TrashIcon width={15} height={15} /> : <MinusIcon width={15} height={15} />}
                    </button>
                    <span aria-live="polite">{item.qty}</span>
                    <button type="button" onClick={() => updateQty(item.id, 1)} aria-label={`Aumentar ${item.name}`}>
                      <PlusIcon width={15} height={15} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <footer className="cart__footer">
              <label className="cart__note">
                <span>Observações</span>
                <textarea
                  rows={2}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Ex.: sem cebola, ponto da carne, troco para R$ 100…"
                />
              </label>
              <div className="cart__total">
                <span>Total</span>
                <strong>{formatPrice(total)}</strong>
              </div>
              <a className="btn btn--whatsapp btn--lg cart__checkout" href={checkoutLink(note)} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon width={20} height={20} /> Finalizar pelo WhatsApp
              </a>
              <button type="button" className="cart__clear" onClick={clear}>
                Limpar pedido
              </button>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
