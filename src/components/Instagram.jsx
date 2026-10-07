import SectionTitle from './SectionTitle.jsx';
import Reveal from './Reveal.jsx';
import { InstagramIcon } from './Icons.jsx';
import { instagramPosts } from '../data/content.js';
import { STORE, instagramLink } from '../data/config.js';
import './Instagram.css';

export default function Instagram() {
  return (
    <section className="section insta" aria-labelledby="insta-title">
      <div className="container">
        <SectionTitle
          eyebrow={`@${STORE.instagram}`}
          title={<span id="insta-title">Siga nosso <span className="text-gradient">Instagram</span></span>}
          text="Lançamentos, bastidores da chapa e promoções que só quem segue fica sabendo."
        />

        <div className="insta__grid">
          {instagramPosts.map((post, i) => (
            <Reveal key={post.id} delay={i * 70} variant="zoom" className="insta__item">
              <a href={instagramLink()} target="_blank" rel="noopener noreferrer" aria-label={`Ver no Instagram: ${post.alt}`}>
                <img src={post.image} alt={post.alt} loading="lazy" decoding="async" width="480" height="480" />
                <span className="insta__overlay" aria-hidden="true">
                  <InstagramIcon width={30} height={30} />
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal className="insta__cta">
          <a href={instagramLink()} target="_blank" rel="noopener noreferrer" className="btn btn--outline">
            <InstagramIcon width={18} height={18} /> Seguir @{STORE.instagram}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
