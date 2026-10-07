import { useEffect, useState } from 'react';

/**
 * Quantos cards mostrar conforme a largura da tela.
 * breakpoints: { larguraMínima: quantidade } — ex.: { 0: 1, 700: 2, 1080: 3 }
 */
export default function usePerView(breakpoints) {
  const compute = () => {
    if (typeof window === 'undefined') return 1;
    const w = window.innerWidth;
    let value = 1;
    Object.keys(breakpoints)
      .map(Number)
      .sort((a, b) => a - b)
      .forEach((min) => {
        if (w >= min) value = breakpoints[min];
      });
    return value;
  };

  const [perView, setPerView] = useState(compute);

  useEffect(() => {
    let frame;
    const onResize = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setPerView(compute()));
    };
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return perView;
}
