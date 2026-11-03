import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { books } from '../data/books';
import SearchBar from '../components/SearchBar';
import BookCard from '../components/BookCard';

export default function CatalogPage() {
  // El texto de búsqueda vive en la URL (/?q=terror). Así, al abrir un libro y
  // volver atrás, el filtro sigue aplicado.
  const [params, setParams] = useSearchParams();
  const query = params.get('q') ?? '';

  const handleSearch = (value) =>
    setParams(value ? { q: value } : {}, { replace: true });

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return books.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.genre.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <>
      <SearchBar value={query} onChange={handleSearch} />

      <section className="grid-container">
        {filtered.length === 0 ? (
          <p>No hay resultados.</p>
        ) : (
          filtered.map((book) => <BookCard key={book.id} book={book} />)
        )}
      </section>
    </>
  );
}
