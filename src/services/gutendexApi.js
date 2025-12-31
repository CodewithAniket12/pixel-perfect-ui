// Gutendex API Service using Promises (no async/await)

var BASE_URL = 'https://gutendex.com';

// Get the viewable URL for a book (HTML > PDF > TXT, excluding zip files)
export function getViewableUrl(formats) {
  // Priority: HTML, PDF, TXT (excluding zip files)
  var htmlKey = Object.keys(formats).find(function(key) {
    return key.includes('text/html') && !formats[key].includes('.zip');
  });
  if (htmlKey) return formats[htmlKey];

  var pdfKey = Object.keys(formats).find(function(key) {
    return key.includes('application/pdf') && !formats[key].includes('.zip');
  });
  if (pdfKey) return formats[pdfKey];

  var txtKey = Object.keys(formats).find(function(key) {
    return key.includes('text/plain') && !formats[key].includes('.zip');
  });
  if (txtKey) return formats[txtKey];

  return null;
}

// Fetch books from the API with filtering
export function fetchBooks(topic, search, page) {
  if (search === undefined) search = '';
  if (page === undefined) page = 1;
  
  return new Promise(function(resolve, reject) {
    var params = new URLSearchParams();
    
    // Add topic filter (genre/category)
    if (topic) {
      params.append('topic', topic);
    }
    
    // Add search filter
    if (search.trim()) {
      params.append('search', search.trim());
    }
    
    // Add mime_type filter to only get books with images (covers)
    params.append('mime_type', 'image');
    
    // Add page parameter
    params.append('page', page.toString());
    
    var url = BASE_URL + '/books?' + params.toString();
    
    fetch(url)
      .then(function(response) {
        if (!response.ok) {
          throw new Error('HTTP error! status: ' + response.status);
        }
        return response.json();
      })
      .then(function(data) {
        resolve(data);
      })
      .catch(function(error) {
        reject(error);
      });
  });
}

// Get cover image URL from formats
export function getCoverImage(formats) {
  var jpegKey = Object.keys(formats).find(function(key) {
    return key.includes('image/jpeg');
  });
  if (jpegKey) return formats[jpegKey];
  
  var pngKey = Object.keys(formats).find(function(key) {
    return key.includes('image/png');
  });
  if (pngKey) return formats[pngKey];
  
  var gifKey = Object.keys(formats).find(function(key) {
    return key.includes('image/gif');
  });
  if (gifKey) return formats[gifKey];
  
  return '';
}

// Get author name from authors array
export function getAuthorName(authors) {
  if (!authors || authors.length === 0) return 'Unknown Author';
  return authors[0].name;
}
