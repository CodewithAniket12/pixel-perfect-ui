import { useEffect, useState, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBooks } from '../services/api';
import BookCard from '../components/BookCard';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';

function Books() {
  var params = useParams();
  var genre = params.genre;
  
  var [books, setBooks] = useState([]);
  var [loading, setLoading] = useState(true);
  var [error, setError] = useState(null);
  var [search, setSearch] = useState('');
  var [page, setPage] = useState(1);
  var [hasMore, setHasMore] = useState(true);
  var [loadingMore, setLoadingMore] = useState(false);
  
  var observer = useRef();
  var debounceTimer = useRef();

  var loadBooks = useCallback(function(searchTerm, pageNum, append) {
    if (pageNum === 1) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }
    
    fetchBooks(genre, searchTerm, pageNum)
      .then(function(data) {
        if (append) {
          setBooks(function(prev) { return prev.concat(data.results); });
        } else {
          setBooks(data.results);
        }
        setHasMore(data.next !== null);
        setError(null);
      })
      .catch(function() {
        setError('Failed to load books');
      })
      .finally(function() {
        setLoading(false);
        setLoadingMore(false);
      });
  }, [genre]);

  useEffect(function() {
    setBooks([]);
    setPage(1);
    setHasMore(true);
    loadBooks('', 1, false);
  }, [genre, loadBooks]);

  useEffect(function() {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    
    debounceTimer.current = setTimeout(function() {
      setBooks([]);
      setPage(1);
      setHasMore(true);
      loadBooks(search, 1, false);
    }, 300);
    
    return function() {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [search, loadBooks]);

  var lastBookRef = useCallback(function(node) {
    if (loading || loadingMore) return;
    
    if (observer.current) {
      observer.current.disconnect();
    }
    
    observer.current = new IntersectionObserver(function(entries) {
      if (entries[0].isIntersecting && hasMore) {
        var nextPage = page + 1;
        setPage(nextPage);
        loadBooks(search, nextPage, true);
      }
    });
    
    if (node) {
      observer.current.observe(node);
    }
  }, [loading, loadingMore, hasMore, page, search, loadBooks]);

  function handleSearchChange(e) {
    setSearch(e.target.value);
  }

  function openBook(book) {
    var formats = book.formats || {};
    var htmlUrl = null;
    var pdfUrl = null;
    var txtUrl = null;
    
    Object.keys(formats).forEach(function(key) {
      var url = formats[key];
      if (key.indexOf('text/html') !== -1 && url.indexOf('.zip') === -1) {
        htmlUrl = url;
      }
      if (key.indexOf('application/pdf') !== -1 && url.indexOf('.zip') === -1) {
        pdfUrl = url;
      }
      if (key.indexOf('text/plain') !== -1 && url.indexOf('.zip') === -1) {
        txtUrl = url;
      }
    });
    
    var viewUrl = htmlUrl || pdfUrl || txtUrl;
    
    if (viewUrl) {
      window.open(viewUrl, '_blank');
    } else {
      alert('No viewable version available');
    }
  }

  if (loading) {
    return (
      <div className="page">
        <div className="books-header-section">
          <Header title={genre} />
          <SearchBar value={search} onChange={handleSearchChange} />
        </div>
        <div className="books-content">
          <div className="loading-more">Loading...</div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="page">
        <div className="books-header-section">
          <Header title={genre} />
        </div>
        <div className="books-content">
          <div className="loading-more">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="books-header-section">
        <Header title={genre} />
        <SearchBar value={search} onChange={handleSearchChange} />
      </div>
      
      <div className="books-content">
        <div className="books-grid">
          {books.map(function(book, index) {
            var cover = book.formats && book.formats['image/jpeg'];
            var author = book.authors && book.authors[0] ? book.authors[0].name : 'Unknown Author';
            var isLast = index === books.length - 1;
            
            return (
              <div key={book.id} ref={isLast ? lastBookRef : null}>
                <BookCard
                  title={book.title}
                  author={author}
                  cover={cover}
                  onClick={function() { openBook(book); }}
                />
              </div>
            );
          })}
          
          {loadingMore && <div className="loading-more">Loading more...</div>}
        </div>
      </div>
    </div>
  );
}

export default Books;
