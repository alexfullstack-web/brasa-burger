import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="section notfound page-offset">
      <div className="container notfound__inner">
        <span className="eyebrow">Erro 404</span>
        <h1 className="display">Essa página saiu para entrega.</h1>
        <p className="lead">Não encontramos o que você procurava — mas o cardápio está aqui.</p>
        <Link to="/" className="btn btn--primary">Voltar ao início</Link>
      </div>
    </section>
  );
}
