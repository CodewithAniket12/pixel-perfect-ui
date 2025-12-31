import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import BookCard from '@/components/BookCard';
import SearchBox from '@/components/SearchBox';
import { genres } from '@/data/genres';
import { 
  fetchBooks, 
  getCoverImage, 
  getAuthorName, 
  getViewableUrl
} from '@/services/gutendexApi';
import BackIcon from '@/assets/icons/Back.svg';

var Books = function() {
  var { genre } = useParams();
  var [searchQuery, setSearchQuery] = useState('');
  var [books, setBooks] = useState([]);
  var [loading, setLoading] = useState(false);
  var [hasMore, setHasMore] = useState(true);
  var [page, setPage] = useState(1);
  var [error, setError] = useState(null);
  var observerRef = useRef(null);
  var loadMoreRef = useRef(null);
  var searchTimeoutRef = useRef(null);

  var genreData = genres.find(function(g) { return g.id === genre; });
  var genreName = genreData ? genreData.name : (genre ? genre.toUpperCase() : 'Books');

  // Load books using promises
  var loadBooks = useCallback(function(pageNum, reset) {
    if (reset === undefined) reset = false;
    if (loading) return;
    
    setLoading(true);
    setError(null);

    fetchBooks(genre || '', searchQuery, pageNum)
      .then(function(data) {
        if (reset) {
          setBooks(data.results);
        } else {
          setBooks(function(prev) { return prev.concat(data.results); });
        }
        setHasMore(data.next !== null);
        setPage(pageNum);
        setLoading(false);
      })
      .catch(function(err) {
        console.error('Error fetching books:', err);
        setError('Failed to load books. Please try again.');
        setLoading(false);
      });
  }, [genre, searchQuery, loading]);

  // Initial load and genre change
  useEffect(function() {
    setBooks([]);
    setPage(1);
    setHasMore(true);
    loadBooks(1, true);
  }, [genre]);

  // Handle search with debounce
  useEffect(function() {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(function() {
      setBooks([]);
      setPage(1);
      setHasMore(true);
      loadBooks(1, true);
    }, 500);

    return function() {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery]);

  // Infinite scroll observer
  useEffect(function() {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      function(entries) {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadBooks(page + 1, false);
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return function() {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasMore, loading, page, loadBooks]);

  // Handle book click - open in browser
  var handleBookClick = function(book) {
    var viewableUrl = getViewableUrl(book.formats);
    
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
          {books.map(function(book) {
            return (
              <BookCard
                key={book.id}
                title={book.title}
                author={getAuthorName(book.authors)}
                cover={getCoverImage(book.formats)}
                onClick={function() { handleBookClick(book); }}
              />
            );
          })}
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
            {searchQuery ? 'No books found matching "' + searchQuery + '"' : 'No books found in this category'}
          </p>
        )}
      </div>
    </div>
  );
};

export default Books;
