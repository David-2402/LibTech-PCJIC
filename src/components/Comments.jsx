import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLocalStorage } from '../hooks/useLocalStorage';

// Comentarios de un libro. Se guardan todos juntos en localStorage ("lib_comments")
// con esta forma:  { "1": [ {user, text, date}, ... ], "2": [ ... ] }
export default function Comments({ bookId }) {
  const { user } = useAuth();
  const [allComments, setAllComments] = useLocalStorage('lib_comments', {});
  const [text, setText] = useState('');

  const list = allComments[bookId] ?? [];

  const handleSubmit = (e) => {
    e.preventDefault();
    const clean = text.trim();
    if (!clean) return;

    const newComment = {
      user: user.user,
      text: clean,
      date: new Date().toLocaleDateString(),
    };

    setAllComments((prev) => ({
      ...prev,
      [bookId]: [...(prev[bookId] ?? []), newComment],
    }));
    setText('');
  };

  return (
    <div className="comments-section">
      <h3>Comentarios de los Lectores</h3>

      <div>
        {list.length === 0 ? (
          <p>
            <small>Sin comentarios todavía.</small>
          </p>
        ) : (
          list.map((c, i) => (
            <div className="comment-item" key={i}>
              <strong>{c.user}</strong> <small>({c.date})</small>
              <p>{c.text}</p>
            </div>
          ))
        )}
      </div>

      <form className="comment-form" onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Comparte tu opinión sobre esta obra..."
          required
        />
        <button type="submit" className="btn-gold btn-inline">
          Comentar
        </button>
      </form>
    </div>
  );
}
