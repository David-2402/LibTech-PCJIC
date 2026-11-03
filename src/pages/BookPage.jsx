import { useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { books } from '../data/books';
import { useAuth } from '../context/AuthContext';
import { assetUrl } from '../utils/assets';
import Comments from '../components/Comments';

export default function BookPage() {
  const { id } = useParams(); // viene de la ruta /libro/:id
  const navigate = useNavigate();
  const location = useLocation();
  const { isAdmin } = useAuth();

  const book = books.find((b) => b.id === Number(id));

  // Al abrir un libro, empezar desde arriba de la página.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // "Volver" respeta el filtro de búsqueda; si se entró directo por URL, va al catálogo.
  const goBack = () => (location.key !== 'default' ? navigate(-1) : navigate('/'));

  if (!book) {
    return (
      <section className="detail-view">
        <p>No encontramos ese libro.</p>
        <br />
        <Link to="/" className="btn-outline">
          ⬅ Volver al catálogo
        </Link>
      </section>
    );
  }

  const pdfUrl = assetUrl(book.pdf);

  return (
    <section className="detail-view">
      <button type="button" className="btn-outline" onClick={goBack}>
        ⬅ Volver al catálogo
      </button>

      <div className="book-info-extended">
        <h2>{book.title}</h2>
        <p>
          <strong>Autor:</strong> {book.author}
        </p>
        <p>
          <strong>Género:</strong> {book.genre}
        </p>
        <p className="book-desc">{book.desc}</p>

        {/* Solo los administradores pueden descargar el PDF */}
        {isAdmin && (
          <a href={pdfUrl} className="btn-gold btn-inline" download>
            📥 Descargar PDF
          </a>
        )}
      </div>

      <div className="pdf-viewer-container">
        <iframe src={pdfUrl} title={`Lectura de ${book.title}`} />
      </div>

      <Comments bookId={book.id} />
    </section>
  );
}
