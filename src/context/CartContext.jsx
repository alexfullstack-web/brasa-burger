import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { formatPrice, whatsappLink } from '../data/config.js';

const CartContext = createContext(null);
const STORAGE_KEY = 'brasa-cart-v1';

function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadCart);
  const [isOpen, setIsOpen] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* armazenamento indisponível — segue só em memória */
    }
  }, [items]);

  /** item: { id, name, price, image?, details? } — itens com o mesmo id somam quantidade */
  const addItem = useCallback((item, { open = false } = {}) => {
    setItems((current) => {
      const found = current.find((i) => i.id === item.id);
      if (found) return current.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i));
      return [...current, { ...item, qty: 1 }];
    });
    setToast({ id: Date.now(), text: `${item.name} adicionado ao pedido` });
    if (open) setIsOpen(true);
  }, []);

  const updateQty = useCallback((id, delta) => {
    setItems((current) =>
      current
        .map((i) => (i.id === id ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0)
    );
  }, []);

  const removeItem = useCallback((id) => setItems((c) => c.filter((i) => i.id !== id)), []);
  const clear = useCallback(() => setItems([]), []);

  const count = items.reduce((sum, i) => sum + i.qty, 0);
  const total = items.reduce((sum, i) => sum + i.qty * i.price, 0);

  const checkoutLink = useCallback(
    (note = '') => {
      if (!items.length) return whatsappLink();
      const lines = items.map(
        (i) => `• ${i.qty}x ${i.name}${i.details ? ` (${i.details})` : ''} — ${formatPrice(i.qty * i.price)}`
      );
      const message = [
        'Olá! Gostaria de fazer um pedido:',
        '',
        ...lines,
        '',
        `*Total: ${formatPrice(total)}*`,
        note.trim() ? `\nObservações: ${note.trim()}` : '',
      ]
        .join('\n')
        .trim();
      return whatsappLink(message);
    },
    [items, total]
  );

  const value = useMemo(
    () => ({
      items, count, total, isOpen, toast,
      addItem, updateQty, removeItem, clear, checkoutLink,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      dismissToast: () => setToast(null),
    }),
    [items, count, total, isOpen, toast, addItem, updateQty, removeItem, clear, checkoutLink]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart deve ser usado dentro de <CartProvider>');
  return ctx;
};
