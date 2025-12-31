import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import BookCard from '@/components/BookCard';
import SearchBox from '@/components/SearchBox';
import { genres } from '@/data/genres';
import { 
  fetchBooks, 
  getCoverImage, 
  getAuthorName, 
  getViewableUrl,
  GutendexBook 
} from '@/services/gutendexApi';
import BackIcon from '@/assets/icons/Back.svg';
import '@/styles/gutenberg.css';

const Books = () => {
  const { genre } = useParams<{ genre: string }>();
  const [searchQuery, setSearchQuery] = useState('');
  const [books, setBooks] = useState<GutendexBook[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const genreData = genres.find(g => g.id === genre);
  const genreName = genreData?.name || genre?.toUpperCase() || 'Books';

  // Load books using promises
  const loadBooks = useCallback((pageNum: number, reset: boolean = false) => {
    if (loading) return;
    
    setLoading(true);
    setError(null);

    fetchBooks(genre || '', searchQuery, pageNum)
      .then(data => {
        if (reset) {
          setBooks(data.results);
        } else {
          setBooks(prev => [...prev, ...data.results]);
        }
        setHasMore(data.next !== null);
        setPage(pageNum);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching books:', err);
        setError('Failed to load books. Please try again.');
        setLoading(false);
      });
  }, [genre, searchQuery, loading]);

  // Initial load and genre change
  useEffect(() => {
    setBooks([]);
    setPage(1);
    setHasMore(true);
    loadBooks(1, true);
  }, [genre]);

  // Handle search with debounce
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      setBooks([]);
      setPage(1);
      setHasMore(true);
      loadBooks(1, true);
    }, 500);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery]);

  // Infinite scroll observer
  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadBooks(page + 1, false);
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasMore, loading, page, loadBooks]);

  // Handle book click - open in browser
  const handleBookClick = (book: GutendexBook) => {
    const viewableUrl = getViewableUrl(book.formats);
    
    if (viewableUrl) {
      window.open(viewableUrl, '_blank');
    } else {
      alert('No viewable version available');
    }
  };

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
        {error && (
          <p className="books-error">{error}</p>
        )}
        <div className="books-grid">
          {books.map((book) => (
            <BookCard
              key={book.id}
              title={book.title}
              author={getAuthorName(book.authors)}
              cover={getCoverImage(book.formats)}
              onClick={() => handleBookClick(book)}
            />
          ))}
        </div>
        
        {/* Loading indicator */}
        {loading && (
          <div className="books-loading">
            <div className="loading-spinner"></div>
            <p>Loading books...</p>
          </div>
        )}
        
        {/* Infinite scroll trigger */}
        {!loading && hasMore && books.length > 0 && (
          <div ref={loadMoreRef} className="load-more-trigger"></div>
        )}
        
        {/* No results message */}
        {!loading && books.length === 0 && !error && (
          <p className="books-no-results">
            {searchQuery ? `No books found matching "${searchQuery}"` : 'No books found in this category'}
          </p>
        )}
      </div>
    </div>
  );
};

export default Books;
