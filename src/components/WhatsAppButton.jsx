import { WhatsAppIcon } from './Icons.jsx';
import { whatsappLink } from '../data/config.js';
import './WhatsAppButton.css';

export default function WhatsAppButton() {
  return (
    <a
      className="wa-float"
      href={whatsappLink('Olá! Gostaria de fazer um pedido.')}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fazer pedido pelo WhatsApp"
    >
      <span className="wa-float__tip">Peça pelo WhatsApp</span>
      <span className="wa-float__btn">
        <WhatsAppIcon width={30} height={30} />
      </span>
    </a>
  );
}
