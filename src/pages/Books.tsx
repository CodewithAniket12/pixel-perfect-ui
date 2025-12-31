import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import BookCard from '@/components/BookCard';
import SearchBox from '@/components/SearchBox';
import { getBooksByGenre } from '@/data/books';
import { genres } from '@/data/genres';
import BackIcon from '@/assets/icons/Back.svg';
import '@/styles/gutenberg.css';

const Books = () => {
  const { genre } = useParams<{ genre: string }>();
  const [searchQuery, setSearchQuery] = useState('');

  const genreData = genres.find(g => g.id === genre);
  const genreName = genreData?.name || genre?.toUpperCase() || 'Books';

  const books = useMemo(() => {
    const genreBooks = getBooksByGenre(genre || '');
    if (!searchQuery.trim()) return genreBooks;
    
    const query = searchQuery.toLowerCase();
    return genreBooks.filter(
      book => 
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query)
    );
  }, [genre, searchQuery]);

  return (
    <div className="books-container">
      <div className="books-header">
        <div className="books-header-content">
          <Link to="/" className="books-back-button">
            <img src={BackIcon} alt="Back" className="books-back-icon" />
            <span className="books-genre-title">{genreName.charAt(0) + genreName.slice(1).toLowerCase()}</span>
          </Link>
          <SearchBox 
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search"
          />
        </div>
      </div>
      <div className="books-content">
        <div className="books-grid">
          {books.map((book) => (
            <BookCard
              key={book.id}
              title={book.title}
              author={book.author}
              cover={book.cover}
            />
          ))}
        </div>
        {books.length === 0 && (
          <p style={{ textAlign: 'center', color: '#A0A0A0', padding: '40px' }}>
            No books found matching "{searchQuery}"
          </p>
        )}
      </div>
    </div>
  );
};

export default Books;
