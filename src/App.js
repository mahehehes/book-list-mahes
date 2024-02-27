import React, { useState } from "react";
import "./index.css";

export default function App() {
  const [books, setBooks] = useState([]);

  function handleAddBook(book) {
    setBooks([book, ...books]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddBook} />
      <Bookshelf books={books} />
      <Stats books={books} />
      <Footer />
    </div>
  );
}

function Logo() {
  return <h1> Book Lover's 📚 </h1>;
}

function Form({ onAddItems }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [status, setStatus] = useState("unread");

  function handleSubmit(e) {
    e.preventDefault();
    if (!title || !author) return;
    const newBook = { title, author, status, id: Date.now() };
    onAddItems(newBook);
    setTitle("");
    setAuthor("");
    setStatus("unread");
  }

  return (
    <form onSubmit={handleSubmit} className="add-form">
      <h2>Tambahkan Buku Baru 📖</h2>
      <input
        type="text"
        placeholder="Judul"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Penulis"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="unread">Belum Dibaca</option>
        <option value="reading">Sedang Dibaca</option>
        <option value="read">Sudah Dibaca</option>
      </select>
      <button type="submit">Tambahkan Buku</button>
    </form>
  );
}

function Bookshelf({ books }) {
  return (
    <div className="list">
      <h2>List Buku Mu :</h2>
      <ul>
        {books.map((book) => (
          <Book key={book.id} book={book} />
        ))}
      </ul>
    </div>
  );
}

function Book({ book }) {
  return (
    <li className={`book ${book.status}`}>
      <span>{book.title} oleh {book.author}</span>
    </li>
  );
}

function Stats({ books }) {
  return (
    <footer className="stats">
      <em>
        📚 Kamu memiliki {books.length} buku di rak, dan sudah membaca {books.filter(book => book.status === "read").length} buku.
      </em>
    </footer>
  );
}

function Footer() {
  return null;
}