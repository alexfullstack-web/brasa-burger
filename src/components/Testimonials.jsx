import Carousel from './Carousel.jsx';
import SectionTitle from './SectionTitle.jsx';
import Reveal from './Reveal.jsx';
import { StarIcon } from './Icons.jsx';
import { testimonials } from '../data/content.js';
import './Testimonials.css';

function TestimonialCard({ t }) {
  return (
    <figure className="tcard">
      <span className="tcard__quote" aria-hidden="true">“</span>
      <div className="tcard__stars" aria-label={`${t.rating} de 5 estrelas`}>
        {Array.from({ length: 5 }, (_, i) => (
          <StarIcon key={i} width={18} height={18} className={i < t.rating ? 'is-on' : ''} />
        ))}
      </div>
      <blockquote className="tcard__text">{t.text}</blockquote>
      <figcaption className="tcard__author">
        <span className="tcard__avatar" aria-hidden="true">{t.author.charAt(0)}</span>
        <span>
          <strong>{t.author}</strong>
          <small>via {t.source}</small>
        </span>
      </figcaption>
    </figure>
  );
}

export default function Testimonials() {
  return (
    <section className="section testimonials" aria-labelledby="testimonials-title">
      <div className="container">
        <SectionTitle
          eyebrow="Avaliações"
          title={<span id="testimonials-title">Quem prova, <span className="text-gradient">volta</span></span>}
        />
        <Reveal delay={120}>
          <Carousel
            label="Avaliações de clientes"
            items={testimonials}
            interval={5500}
            perView={{ 0: 1, 760: 2, 1180: 3 }}
            renderItem={(t) => <TestimonialCard t={t} />}
          />
        </Reveal>
      </div>
    </section>
  );
}
