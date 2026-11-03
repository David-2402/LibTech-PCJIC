import { useState } from "react";
import { booksData } from "../data/books";
import BookDetail from "./BookDetail";

export default function Catalog() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const filtered = booksData.filter(
    (b) =>
      b.title.toLowerCase().includes(query.toLowerCase()) ||
      b.author.toLowerCase().includes(query.toLowerCase()) ||
      b.genre.toLowerCase().includes(query.toLowerCase())
  );

  const selectedBook = booksData.find((b) => b.id === selectedId);

  if (selectedBook) {
    return <BookDetail book={selectedBook} onClose={() => setSelectedId(null)} />;
  }

  return (
    <div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Busca por título, autor o género..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <section className="grid-container">
        {filtered.length === 0 ? (
          <p>No hay resultados.</p>
        ) : (
          filtered.map((b) => (
            <div className="book-card" key={b.id}>
              <div>
                <h3>{b.title}</h3>
                <p><em>{b.author}</em></p>
                <span className="tag">{b.genre}</span>
              </div>
              <button className="btn-gold" onClick={() => setSelectedId(b.id)}>
                Ver Contenido
              </button>
            </div>
          ))
        )}
      </section>
    </div>
  );
}
