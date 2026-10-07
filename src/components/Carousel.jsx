import { useEffect, useRef, useState } from 'react';
import usePerView from '../hooks/usePerView.js';
import { ArrowLeft, ArrowRight } from './Icons.jsx';
import './Carousel.css';

/**
 * Carrossel genérico, reutilizável.
 * - perView: { larguraMínima: cards } (padrão 1 / 2 / 3)
 * - autoplay suave que pausa no hover/foco
 * - setas, indicadores e swipe no celular
 */
export default function Carousel({
  items,
  renderItem,
  getKey = (item) => item.id,
  perView: breakpoints = { 0: 1, 700: 2, 1080: 3 },
  interval = 4500,
  label = 'Carrossel',
  className = '',
}) {
  const perView = usePerView(breakpoints);
  const maxIndex = Math.max(0, items.length - perView);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const pointer = useRef(null);

  useEffect(() => {
    if (index > maxIndex) setIndex(maxIndex);
  }, [index, maxIndex]);

  useEffect(() => {
    if (paused || maxIndex === 0) return;
    const t = setTimeout(() => setIndex((i) => (i >= maxIndex ? 0 : i + 1)), interval);
    return () => clearTimeout(t);
  }, [index, paused, maxIndex, interval]);

  const go = (i) => setIndex(i < 0 ? maxIndex : i > maxIndex ? 0 : i);

  const onPointerDown = (e) => {
    pointer.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerUp = (e) => {
    if (!pointer.current) return;
    const dx = e.clientX - pointer.current.x;
    const dy = e.clientY - pointer.current.y;
    pointer.current = null;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) go(index + (dx < 0 ? 1 : -1));
  };

  return (
    <div
      className={`carousel ${className}`}
      aria-roledescription="carrossel"
      aria-label={label}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="carousel__viewport" onPointerDown={onPointerDown} onPointerUp={onPointerUp} onPointerCancel={() => (pointer.current = null)}>
        <ul
          className="carousel__track"
          style={{ '--per-view': perView, transform: `translate3d(${-(index * 100) / perView}%, 0, 0)` }}
        >
          {items.map((item, i) => {
            const visible = i >= index && i < index + perView;
            return (
              <li key={getKey(item)} className={`carousel__slide ${visible ? 'is-visible' : ''}`} aria-hidden={!visible} inert={!visible ? '' : undefined}>
                {renderItem(item, i)}
              </li>
            );
          })}
        </ul>
      </div>

      {maxIndex > 0 && (
        <div className="carousel__controls">
          <button type="button" className="icon-btn icon-btn--outline" onClick={() => go(index - 1)} aria-label="Anterior">
            <ArrowLeft />
          </button>
          <div className="dots">
            {Array.from({ length: maxIndex + 1 }, (_, i) => (
              <button
                key={i}
                type="button"
                className={`dot ${i === index ? 'is-active' : ''} ${paused ? 'is-paused' : ''}`}
                style={{ '--duration': `${interval}ms` }}
                onClick={() => go(i)}
                aria-label={`Ir para o item ${i + 1}`}
                aria-current={i === index}
              />
            ))}
          </div>
          <button type="button" className="icon-btn icon-btn--outline" onClick={() => go(index + 1)} aria-label="Próximo">
            <ArrowRight />
          </button>
        </div>
      )}
    </div>
  );
}
