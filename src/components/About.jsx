import Reveal from './Reveal.jsx';
import { FlameIcon } from './Icons.jsx';
import './About.css';

const FEATURES = [
  { title: 'Grelhado na brasa', text: 'Selagem forte por fora, suculência total por dentro.' },
  { title: 'Blend da casa', text: 'Cortes bovinos selecionados, moídos diariamente.' },
  { title: 'Pão brioche', text: 'Macio, levemente adocicado e selado na manteiga.' },
  { title: 'Molhos autorais', text: 'Receitas próprias, preparadas aqui todos os dias.' },
];

export default function About() {
  return (
    <section id="sobre" className="section about" aria-labelledby="about-title">
      <div className="container about__grid">
        <Reveal variant="clip" className="about__media">
          <img
            src="/img/bacon-full.webp"
            alt="Hambúrguer artesanal com bacon, cheddar, alface e tomate"
            loading="lazy"
            decoding="async"
            width="934"
            height="1400"
          />
          <div className="about__tag">
            <FlameIcon width={18} height={18} />
            Preparado na hora
          </div>
        </Reveal>

        <div className="about__content">
          <Reveal>
            <span className="eyebrow">Nossa história</span>
            <h2 id="about-title" className="display about__title">
              Feito na brasa.
              <br />
              <span className="text-gradient">Feito com paixão.</span>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="lead about__lead">
              Cada hambúrguer é preparado na hora para entregar uma experiência completa em cada mordida.
            </p>
          </Reveal>

          <ul className="about__features">
            {FEATURES.map((f, i) => (
              <Reveal as="li" key={f.title} delay={200 + i * 90}>
                <span className="about__num">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{f.title}</h3>
                  <p>{f.text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
