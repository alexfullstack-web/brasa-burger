import { useState } from 'react';
import SectionTitle from './SectionTitle.jsx';
import ProductImage from './ProductImage.jsx';
import useInView from '../hooks/useInView.js';
import { CheckIcon } from './Icons.jsx';
import { COMBO_BASE, comboDrinks, comboSides, products } from '../data/products.js';
import { formatPrice } from '../data/config.js';
import { useCart } from '../context/CartContext.jsx';
import './Combos.css';

const burgers = products.filter((p) => p.category === 'burgers');

function OptionGroup({ title, step, options, value, onChange, renderMeta }) {
  return (
    <fieldset className="combo__group">
      <legend>
        <span className="combo__step">{step}</span> {title}
      </legend>
      <div className="combo__options">
        {options.map((o) => (
          <label key={o.id} className={`combo__option ${value === o.id ? 'is-selected' : ''}`}>
            <input type="radio" name={title} value={o.id} checked={value === o.id} onChange={() => onChange(o.id)} />
            <span className="combo__option-name">{o.name}</span>
            <span className="combo__option-meta">{renderMeta(o)}</span>
            {value === o.id && <CheckIcon className="combo__check" width={14} height={14} />}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default function Combos() {
  const [burgerId, setBurgerId] = useState('classic');
  const [sideId, setSideId] = useState('fries');
  const [drinkId, setDrinkId] = useState('soda');
  const [stageRef, inView] = useInView({ threshold: 0.35 });
  const { addItem } = useCart();

  const burger = burgers.find((b) => b.id === burgerId);
  const side = comboSides.find((s) => s.id === sideId);
  const drink = comboDrinks.find((d) => d.id === drinkId);
  const price = burger.price + COMBO_BASE + side.extra + drink.extra;

  const add = () =>
    addItem(
      {
        id: `combo-${burger.id}-${side.id}-${drink.id}`,
        name: `Combo ${burger.name}`,
        details: `${side.name} + ${drink.name}`,
        price,
        image: burger.image,
      },
      { open: true }
    );

  const extra = (o) => (o.extra ? `+ ${formatPrice(o.extra)}` : 'incluso');

  return (
    <section id="combos" className="section combo" aria-labelledby="combo-title">
      <div className="container combo__grid">
        <div className="combo__panel">
          <SectionTitle
            align="left"
            eyebrow="Combos"
            title={<span id="combo-title">Monte seu <span className="text-gradient">combo</span></span>}
            text="Burger + acompanhamento + bebida, com preço de combo. Monte do seu jeito."
          />

          <OptionGroup step="1" title="Burger" options={burgers} value={burgerId} onChange={setBurgerId} renderMeta={(o) => formatPrice(o.price + COMBO_BASE)} />
          <OptionGroup step="2" title="Acompanhamento" options={comboSides} value={sideId} onChange={setSideId} renderMeta={extra} />
          <OptionGroup step="3" title="Bebida" options={comboDrinks} value={drinkId} onChange={setDrinkId} renderMeta={extra} />
        </div>

        <div ref={stageRef} className={`combo__stage ${inView ? 'is-in' : ''}`}>
          <div className="combo__composition">
            <div className="combo__piece combo__piece--burger" key={`b-${burger.id}`}>
              <div className="combo__img combo__img--main">
                <ProductImage image={burger.image} alt={burger.name} sizes="(min-width: 1024px) 300px, 50vw" />
              </div>
              <span>{burger.name}</span>
            </div>
            <span className="combo__plus combo__plus--1" aria-hidden="true">+</span>
            <div className="combo__piece combo__piece--side" key={`s-${side.id}`}>
              <div className="combo__img">
                <ProductImage image={side.image} alt={side.name} sizes="(min-width: 1024px) 180px, 30vw" />
              </div>
              <span>{side.name}</span>
            </div>
            <span className="combo__plus combo__plus--2" aria-hidden="true">+</span>
            <div className="combo__piece combo__piece--drink" key={`d-${drink.id}`}>
              <div className="combo__img">
                <ProductImage image={drink.image} alt={drink.name} sizes="(min-width: 1024px) 180px, 30vw" />
              </div>
              <span>{drink.name}</span>
            </div>
          </div>

          <div className="combo__total">
            <div>
              <small>Seu combo</small>
              <strong key={price}>{formatPrice(price)}</strong>
            </div>
            <button type="button" className="btn btn--primary btn--lg" onClick={add}>
              Adicionar combo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
