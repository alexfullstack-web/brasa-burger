import { useEffect } from 'react';
import { CheckIcon } from './Icons.jsx';
import { useCart } from '../context/CartContext.jsx';

/** Aviso rápido "adicionado ao pedido" com atalho para abrir o carrinho. */
export default function Toast() {
  const { toast, dismissToast, openCart, isOpen } = useCart();

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(dismissToast, 2600);
    return () => clearTimeout(t);
  }, [toast, dismissToast]);

  if (!toast || isOpen) return null;

  return (
    <div className="toast" role="status" key={toast.id}>
      <span className="toast__icon">
        <CheckIcon width={16} height={16} />
      </span>
      <span className="toast__text">{toast.text}</span>
      <button
        type="button"
        className="toast__btn"
        onClick={() => {
          dismissToast();
          openCart();
        }}
      >
        Ver pedido
      </button>
    </div>
  );
}
