import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Rola até a âncora (#secao) ao navegar, ou para o topo ao trocar de página. */
export default function ScrollManager() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (hash) {
      // espera a página (inclusive lazy) renderizar
      const t = setTimeout(() => {
        document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 60);
      return () => clearTimeout(t);
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, hash, key]);

  return null;
}
