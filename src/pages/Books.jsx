import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBooks } from '../services/api';
import BookCard from '../components/BookCard';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';

// Books Page Component
// Displays list of books for a selected genre
function Books() {
  // Get genre from URL (example: /books/fiction -> genre = "fiction")
  var params = useParams();
  var genre = params.genre;
  
  // STATE VARIABLES
  // books = array of book objects from API
  var booksState = useState([]);
  var books = booksState[0];
  var setBooks = booksState[1];
  
  // loading = true when fetching first page
  var loadingState = useState(true);
  var loading = loadingState[0];
  var setLoading = loadingState[1];
  
  // error = error message if API fails
  var errorState = useState(null);
  var error = errorState[0];
  var setError = errorState[1];
  
  // search = text user typed in search box
  var searchState = useState('');
  var search = searchState[0];
  var setSearch = searchState[1];
  
  // page = current page number for pagination
  var pageState = useState(1);
  var page = pageState[0];
  var setPage = pageState[1];
  
  // hasMore = true if there are more pages to load
  var hasMoreState = useState(true);
  var hasMore = hasMoreState[0];
  var setHasMore = hasMoreState[1];
  
  // loadingMore = true when loading additional pages
  var loadingMoreState = useState(false);
  var loadingMore = loadingMoreState[0];
  var setLoadingMore = loadingMoreState[1];

  // EFFECT: Load books when genre changes (user clicks different genre)
  useEffect(function() {
    setLoading(true);
    setBooks([]);
    setPage(1);
    setSearch('');
    
    fetchBooks(genre, '', 1)
      .then(function(data) {
        setBooks(data.results);
        setHasMore(data.next !== null);
        setLoading(false);
      })
      .catch(function() {
        setError('Failed to load books');
        setLoading(false);
      });
  }, [genre]);

  // EFFECT: Search books when search text changes
  useEffect(function() {
    // Skip on first render (when search is empty from genre change)
    if (search === '') return;
    
    setLoading(true);
    setBooks([]);
    setPage(1);
    
    fetchBooks(genre, search, 1)
      .then(function(data) {
        setBooks(data.results);
        setHasMore(data.next !== null);
        setLoading(false);
      })
      .catch(function() {
        setError('Failed to load books');
        setLoading(false);
      });
  }, [search, genre]);

  // FUNCTION: Load more books (next page)
  function loadMore() {
    if (loadingMore || !hasMore) return;
    
    setLoadingMore(true);
    var nextPage = page + 1;
    
    fetchBooks(genre, search, nextPage)
      .then(function(data) {
        // Add new books to existing books array
        setBooks(books.concat(data.results));
        setPage(nextPage);
        setHasMore(data.next !== null);
        setLoadingMore(false);
      })
      .catch(function() {
        setLoadingMore(false);
      });
  }

  // FUNCTION: Handle scroll for infinite scrolling
  function handleScroll(event) {
    var element = event.target;
    // Check if scrolled near bottom (within 100px)
    var nearBottom = element.scrollHeight - element.scrollTop <= element.clientHeight + 100;
    
    if (nearBottom && hasMore && !loadingMore && !loading) {
      loadMore();
    }
  }

  // FUNCTION: Handle search input change
  function handleSearchChange(event) {
    setSearch(event.target.value);
  }

  // FUNCTION: Open book in new tab
  // Priority: HTML > PDF > TXT (as per instructions)
  function openBook(book) {
    var formats = book.formats;
    if (!formats) {
      alert('No viewable version available');
      return;
    }
    
    var htmlUrl = null;
    var pdfUrl = null;
    var txtUrl = null;
    
    // Loop through all format keys
    var keys = Object.keys(formats);
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var url = formats[key];
      
      // Skip zip files (Caveat from instructions)
      if (url.indexOf('.zip') !== -1) {
        continue;
      }
      
      // Check for HTML format
      if (key.indexOf('text/html') !== -1) {
        htmlUrl = url;
      }
      // Check for PDF format
      if (key.indexOf('application/pdf') !== -1) {
        pdfUrl = url;
      }
      // Check for TXT format
      if (key.indexOf('text/plain') !== -1) {
        txtUrl = url;
      }
    }
    
    // Open in priority order: HTML first, then PDF, then TXT
    if (htmlUrl) {
      window.open(htmlUrl, '_blank');
    } else if (pdfUrl) {
      window.open(pdfUrl, '_blank');
    } else if (txtUrl) {
      window.open(txtUrl, '_blank');
    } else {
      alert('No viewable version available');
    }
  }

  // RENDER: Loading state
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
  
  // RENDER: Error state
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

  // RENDER: Books list
  return (
    <div className="page">
      <div className="books-header-section">
        <Header title={genre} />
        <SearchBar value={search} onChange={handleSearchChange} />
      </div>
      
      <div className="books-content" onScroll={handleScroll} style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 180px)' }}>
        <div className="books-grid">
          {books.map(function(book) {
            // Get book cover image
            var cover = book.formats['image/jpeg'];
            // Get first author name or "Unknown Author"
            var author = book.authors[0] ? book.authors[0].name : 'Unknown Author';
            
            return (
              <BookCard
                key={book.id}
                title={book.title}
                author={author}
                cover={cover}
                onClick={function() { openBook(book); }}
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
