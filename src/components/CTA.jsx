import Reveal from './Reveal.jsx';
import { whatsappLink } from '../data/config.js';
import './CTA.css';

export default function CTA() {
  return (
    <section className="cta" aria-labelledby="cta-title">
      <div className="cta__bg" aria-hidden="true">
        <img src="/img/double-full.webp" alt="" loading="lazy" decoding="async" width="1400" height="1163" />
      </div>
      <div className="container cta__inner">
        <Reveal>
          <h2 id="cta-title" className="cta__title">
            Deu <span className="text-gradient">fome?</span>
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="cta__text">Seu próximo hambúrguer favorito está esperando por você.</p>
        </Reveal>
        <Reveal delay={220}>
          <a className="btn btn--primary btn--xl cta__btn" href={whatsappLink()} target="_blank" rel="noopener noreferrer">
            Pedir agora <span aria-hidden="true">🍔</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
