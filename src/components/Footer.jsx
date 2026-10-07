import { Link } from 'react-router-dom';
import Logo from './Logo.jsx';
import { ClockIcon, InstagramIcon, PinIcon, WhatsAppIcon } from './Icons.jsx';
import { NAV_LINKS, STORE, instagramLink, whatsappLink } from '../data/config.js';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contato" className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <Logo />
          <p>{STORE.slogan} Ingredientes selecionados, carne suculenta e muito sabor em cada mordida.</p>
          <div className="footer__social">
            <a href={instagramLink()} target="_blank" rel="noopener noreferrer" className="icon-btn icon-btn--outline" aria-label="Instagram">
              <InstagramIcon />
            </a>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="icon-btn icon-btn--outline" aria-label="WhatsApp">
              <WhatsAppIcon />
            </a>
          </div>
        </div>

        <nav className="footer__col" aria-label="Links do rodapé">
          <h3>Links</h3>
          <ul>
            {NAV_LINKS.map((l) => (
              <li key={l.hash}>
                <Link to={{ pathname: '/', hash: l.hash }}>{l.label}</Link>
              </li>
            ))}
            <li>
              <Link to="/cardapio">Cardápio completo</Link>
            </li>
          </ul>
        </nav>

        <div className="footer__col">
          <h3>
            <ClockIcon width={16} height={16} /> Horário
          </h3>
          <ul className="footer__hours">
            {STORE.hours.map((h) => (
              <li key={h.days}>
                <span>{h.days}</span>
                <strong className={h.time === 'Fechado' ? 'is-closed' : ''}>{h.time}</strong>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h3>
            <PinIcon width={16} height={16} /> Contato
          </h3>
          <ul>
            <li>
              <a href={STORE.mapsUrl} target="_blank" rel="noopener noreferrer">{STORE.address}</a>
            </li>
            <li>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">WhatsApp: {STORE.phone}</a>
            </li>
            <li>
              <a href={instagramLink()} target="_blank" rel="noopener noreferrer">Instagram: @{STORE.instagram}</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container footer__bottom">
        <p>© {year} {STORE.name}. Todos os direitos reservados.</p>
        <p>
          Desenvolvido por <strong>Alex Sousa Tech</strong>
        </p>
      </div>
    </footer>
  );
}
