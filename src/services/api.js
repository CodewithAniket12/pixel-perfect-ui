var BASE_URL = 'https://gutendex.com/books';

export function fetchBooks(genre, search, page) {
  var url = BASE_URL + '?topic=' + encodeURIComponent(genre) + '&mime_type=image';
  
  if (search) {
    url += '&search=' + encodeURIComponent(search);
  }
  
  if (page) {
    url += '&page=' + page;
  }
  
  return fetch(url).then(function(response) {
    if (!response.ok) {
      throw new Error('Failed to fetch books');
    }
    return response.json();
  });
}
