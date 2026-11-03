import { Link } from 'react-router-dom';

export default function BookCard({ book }) {
  return (
    <article className="book-card">
      <div>
        <h3>{book.title}</h3>
        <p>
          <em>{book.author}</em>
        </p>
        <span className="tag">{book.genre}</span>
      </div>
      <Link to={`/libro/${book.id}`} className="btn-gold">
        Ver Contenido
      </Link>
    </article>
  );
}
