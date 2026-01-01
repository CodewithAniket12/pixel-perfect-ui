import React from 'react';

var BookCard = function({ title, author, cover, onClick }) {
  return (
    <div className="book-card" onClick={onClick}>
      <img src={cover} alt={title} className="book-cover" />
      <h3 className="book-title">{title}</h3>
      <p className="book-author">{author}</p>
    </div>
  );
};

export default BookCard;
