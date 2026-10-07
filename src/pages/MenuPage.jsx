import Menu from '../components/Menu.jsx';
import CTA from '../components/CTA.jsx';

export default function MenuPage() {
  return (
    <div className="page-offset">
      <Menu standalone />
      <CTA />
    </div>
  );
}
