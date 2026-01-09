// API Base URL from instruction document
var BASE_URL = 'http://skunkworks.ignitesol.com:8000/books';

// Function to fetch books from the API
// genre = category like "fiction", "drama"
// search = search text for title/author
// page = page number for pagination
export function fetchBooks(genre, search, page) {
  // Build the URL with query parameters
  // topic = genre/category filter
  // mime_type=image = only get books with covers
  var url = BASE_URL + '?topic=' + encodeURIComponent(genre) + '&mime_type=image';
  
  // Add search parameter if user typed something
  if (search) {
    url = url + '&search=' + encodeURIComponent(search);
  }
  
  // Add page number for pagination
  if (page) {
    url = url + '&page=' + page;
  }
  
  // Fetch data from API and return as JSON
  return fetch(url).then(function(response) {
    if (!response.ok) {
      throw new Error('Failed to fetch books');
    }
    return response.json();
  });
}
