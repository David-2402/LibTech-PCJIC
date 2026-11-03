import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const COMMENTS_KEY = "lib_comments";

function loadComments(bookId) {
  const all = JSON.parse(localStorage.getItem(COMMENTS_KEY)) || {};
  return all[bookId] || [];
}

function saveComment(bookId, comment) {
  const all = JSON.parse(localStorage.getItem(COMMENTS_KEY)) || {};
  if (!all[bookId]) all[bookId] = [];
  all[bookId].push(comment);
  localStorage.setItem(COMMENTS_KEY, JSON.stringify(all));
}

export default function BookDetail({ book, onClose }) {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    setComments(loadComments(book.id));
  }, [book.id]);

  function handleSubmit(e) {
    e.preventDefault();
    const comment = { user: user.user, text: commentText, date: new Date().toLocaleDateString() };
    saveComment(book.id, comment);
    setComments(loadComments(book.id));
    setCommentText("");
  }

  const canDownload = user.role.toLowerCase() === "admin";

  return (
    <section className="detail-view">
      <button className="btn-outline" onClick={onClose}>⬅ Volver al catálogo</button>

      <div className="book-info-extended">
        <h2>{book.title}</h2>
        <p><strong>Autor:</strong> {book.author}</p>
        <p><strong>Género:</strong> {book.genre}</p>
        <p style={{ margin: "15px 0", lineHeight: 1.6 }}>{book.desc}</p>
        {canDownload && (
          <a
            className="btn-gold text-center"
            style={{ display: "inline-block", width: "auto", textDecoration: "none" }}
            href={book.pdf}
            download
          >
            📥 Descargar PDF
          </a>
        )}
      </div>

      <div className="pdf-viewer-container">
        <iframe title={book.title} src={book.pdf} width="100%" height="600px" />
      </div>

      <div className="comments-section">
        <h3>Comentarios de los Lectores</h3>
        <div>
          {comments.length === 0 ? (
            <p><small>Sin comentarios todavía.</small></p>
          ) : (
            comments.map((c, i) => (
              <div className="comment-item" key={i}>
                <strong>{c.user}</strong> <small>({c.date})</small>
                <p>{c.text}</p>
              </div>
            ))
          )}
        </div>
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="Comparte tu opinión sobre esta obra..."
            required
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button type="submit" className="btn-gold" style={{ width: "auto", padding: "10px 30px" }}>
            Comentar
          </button>
        </form>
      </div>
    </section>
  );
}
