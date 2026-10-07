import Carousel from './Carousel.jsx';
import ProductCard from './ProductCard.jsx';
import SectionTitle from './SectionTitle.jsx';
import Reveal from './Reveal.jsx';
import { carouselProducts } from '../data/products.js';

export default function BurgerCarousel() {
  return (
    <section className="section section--tight-top" aria-labelledby="favoritos-title">
      <div className="container">
        <SectionTitle
          eyebrow="Burgers da casa"
          title={<span id="favoritos-title">Escolha seu <span className="text-gradient">favorito</span></span>}
          text="Blends artesanais grelhados na brasa, pão brioche selado na manteiga e molhos feitos aqui."
        />
        <Reveal delay={120}>
          <Carousel
            label="Hambúrgueres da casa"
            items={carouselProducts}
            perView={{ 0: 1, 700: 2, 1080: 3 }}
            renderItem={(p) => <ProductCard product={p} />}
          />
        </Reveal>
      </div>
    </section>
  );
}
