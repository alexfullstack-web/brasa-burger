import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo.jsx';
import { CartIcon, CloseIcon, MenuIcon } from './Icons.jsx';
import { NAV_LINKS, whatsappLink } from '../data/config.js';
import { useCart } from '../context/CartContext.jsx';
import './Header.css';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, openCart } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('no-scroll', menuOpen);
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''} ${menuOpen ? 'header--open' : ''}`}>
      <div className="container header__inner">
        <Link to={{ pathname: '/', hash: '#inicio' }} className="header__logo" onClick={close}>
          <Logo />
        </Link>

        <nav className={`header__nav ${menuOpen ? 'is-open' : ''}`} aria-label="Navegação principal">
          <ul>
            {NAV_LINKS.map((link, i) => (
              <li key={link.hash} style={{ '--i': i }}>
                <Link to={{ pathname: '/', hash: link.hash }} onClick={close}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <a className="btn btn--primary header__nav-cta" href={whatsappLink()} target="_blank" rel="noopener noreferrer" onClick={close}>
            Pedir agora
          </a>
        </nav>

        <div className="header__actions">
          <button type="button" className="icon-btn header__cart" onClick={openCart} aria-label={`Abrir pedido (${count} itens)`}>
            <CartIcon />
            {count > 0 && <span key={count} className="header__badge">{count}</span>}
          </button>
          <a className="btn btn--primary btn--sm header__cta" href={whatsappLink()} target="_blank" rel="noopener noreferrer">
            Pedir agora
          </a>
          <button
            type="button"
            className="icon-btn header__toggle"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>
    </header>
  );
}
