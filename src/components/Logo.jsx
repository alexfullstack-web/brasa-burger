import { STORE } from '../data/config.js';

/** Logo da hamburgueria — troque por <img src="/logo.svg" /> quando houver a marca oficial. */
export default function Logo({ compact = false }) {
  return (
    <span className="logo" aria-label={STORE.name}>
      <svg className="logo__mark" viewBox="0 0 48 48" aria-hidden="true">
        <defs>
          <linearGradient id="logoFlame" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor="#ff4d1c" />
            <stop offset="1" stopColor="#ff9a2e" />
          </linearGradient>
        </defs>
        <path d="M24 4c7 8 12 14 12 22a12 12 0 0 1-24 0c0-5.6 3.2-9.6 6.4-13.4.8 4.6 3.2 7.2 5.6 8.4-.8-6.4 0-12 0-17Z" fill="url(#logoFlame)" />
        <path d="M24 24c3 3.6 4.8 6 4.8 9a4.8 4.8 0 0 1-9.6 0c0-2.2 1.4-4 2.6-5.3.4 1.4 1.2 2.2 2.2 2.8-.2-2.2 0-4.4 0-6.5Z" fill="#f4b544" />
      </svg>
      {!compact && (
        <span className="logo__text">
          <span className="logo__name">BRASA</span>
          <span className="logo__sub">BURGER CO.</span>
        </span>
      )}
    </span>
  );
}
