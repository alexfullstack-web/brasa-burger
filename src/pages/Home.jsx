import HeroBurger from '../components/HeroBurger.jsx';
import BurgerCarousel from '../components/BurgerCarousel.jsx';
import PopularProducts from '../components/PopularProducts.jsx';
import Menu from '../components/Menu.jsx';
import Combos from '../components/Combos.jsx';
import About from '../components/About.jsx';
import Testimonials from '../components/Testimonials.jsx';
import Instagram from '../components/Instagram.jsx';
import CTA from '../components/CTA.jsx';

export default function Home() {
  return (
    <>
      <HeroBurger />
      <BurgerCarousel />
      <PopularProducts />
      <Menu />
      <Combos />
      <About />
      <Testimonials />
      <Instagram />
      <CTA />
    </>
  );
}
