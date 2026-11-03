export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <input
        type="search"
        className="search-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Busca por título, autor o género..."
        aria-label="Buscar libros"
      />
    </div>
  );
}
