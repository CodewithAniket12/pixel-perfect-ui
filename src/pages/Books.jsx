import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBooks } from '../services/api';
import BookCard from '../components/BookCard';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';

function Books() {
  const { genre } = useParams();
  
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // Load books when genre or search changes
  useEffect(() => {
    let cancelled = false;
    
    setLoading(true);
    setBooks([]);
    setPage(1);
    setError(null);
    
    // Debounce search to avoid too many API calls
    const timeoutId = setTimeout(() => {
      fetchBooks(genre, search, 1)
        .then((data) => {
          if (!cancelled) {
            setBooks(data.results);
            setHasMore(data.next !== null);
            setLoading(false);
          }
        })
        .catch(() => {
          if (!cancelled) {
            setError('Failed to load books');
            setLoading(false);
          }
        });
    }, search ? 300 : 0); // Debounce only for search, not for genre change
    
    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [genre, search]);

  // Load more books (next page)
  const loadMore = () => {
    if (loadingMore || !hasMore) return;
    
    setLoadingMore(true);
    const nextPage = page + 1;
    
    fetchBooks(genre, search, nextPage)
      .then((data) => {
        setBooks(books.concat(data.results));
        setPage(nextPage);
        setHasMore(data.next !== null);
        setLoadingMore(false);
      })
      .catch(() => {
        setLoadingMore(false);
      });
  };

  // Handle scroll for infinite scrolling
  const handleScroll = (event) => {
    const element = event.target;
    const nearBottom = element.scrollHeight - element.scrollTop <= element.clientHeight + 100;
    
    if (nearBottom && hasMore && !loadingMore && !loading) {
      loadMore();
    }
  };

  // Open book in new tab (HTML > PDF > TXT priority)
  const openBook = (book) => {
    const { formats } = book;
    if (!formats) {
      alert('No viewable version available');
      return;
    }
    
    let htmlUrl = null;
    let pdfUrl = null;
    let txtUrl = null;
    
    Object.keys(formats).forEach((key) => {
      const url = formats[key];
      if (url.indexOf('.zip') !== -1) return; // Skip zip files
      
      if (key.indexOf('text/html') !== -1) htmlUrl = url;
      if (key.indexOf('application/pdf') !== -1) pdfUrl = url;
      if (key.indexOf('text/plain') !== -1) txtUrl = url;
    });
    
    const urlToOpen = htmlUrl || pdfUrl || txtUrl;
    if (urlToOpen) {
      window.open(urlToOpen, '_blank');
    } else {
      alert('No viewable version available');
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="page">
        <div className="books-header-section">
          <Header title={genre} />
          <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="books-content">
          <div className="loading-more">Loading...</div>
        </div>
      </div>
    );
  }
  
  // Error state
  if (error) {
    return (
      <div className="page">
      <div className="books-header-section">
          <Header title={genre} />
          <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="books-content">
          <div className="loading-more">{error}</div>
        </div>
      </div>
    );
  }

  // Books list
  return (
    <div className="page">
      <div className="books-header-section">
        <Header title={genre} />
        <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      
      <div className="books-content" onScroll={handleScroll} style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 180px)' }}>
        <div className="books-grid">
          {books.map((book) => {
            const cover = book.formats['image/jpeg'];
            const author = book.authors[0] ? book.authors[0].name : 'Unknown Author';
            
            return (
              <BookCard
                key={book.id}
                title={book.title}
                author={author}
                cover={cover}
                onClick={() => openBook(book)}
              />
            );
          })}
        </div>
        
        {loadingMore && <div className="loading-more">Loading more...</div>}
      </div>
    </div>
  );
}

export default Books;
