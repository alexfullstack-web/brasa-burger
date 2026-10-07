import Reveal from './Reveal.jsx';

export default function SectionTitle({ eyebrow, title, text, align = 'center', as = 'h2' }) {
  const Heading = as;
  return (
    <Reveal className={`section-title section-title--${align}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <Heading className="display">{title}</Heading>
      {text && <p className="lead">{text}</p>}
    </Reveal>
  );
}
