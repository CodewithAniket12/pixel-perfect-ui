// Gutendex API Service using Promises (no async/await)

const BASE_URL = 'https://gutendex.com';

export interface GutendexBook {
  id: number;
  title: string;
  authors: Array<{
    name: string;
    birth_year: number | null;
    death_year: number | null;
  }>;
  subjects: string[];
  bookshelves: string[];
  languages: string[];
  copyright: boolean;
  media_type: string;
  formats: Record<string, string>;
  download_count: number;
}

export interface GutendexResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: GutendexBook[];
}

// Get the viewable URL for a book (HTML > PDF > TXT, excluding zip files)
export function getViewableUrl(formats: Record<string, string>): string | null {
  // Priority: HTML, PDF, TXT (excluding zip files)
  const htmlKey = Object.keys(formats).find(
    key => key.includes('text/html') && !formats[key].includes('.zip')
  );
  if (htmlKey) return formats[htmlKey];

  const pdfKey = Object.keys(formats).find(
    key => key.includes('application/pdf') && !formats[key].includes('.zip')
  );
  if (pdfKey) return formats[pdfKey];

  const txtKey = Object.keys(formats).find(
    key => key.includes('text/plain') && !formats[key].includes('.zip')
  );
  if (txtKey) return formats[txtKey];

  return null;
}

// Fetch books from the API with filtering
export function fetchBooks(
  topic: string,
  search: string = '',
  page: number = 1
): Promise<GutendexResponse> {
  return new Promise((resolve, reject) => {
    const params = new URLSearchParams();
    
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
    
    const url = `${BASE_URL}/books?${params.toString()}`;
    
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        resolve(data as GutendexResponse);
      })
      .catch(error => {
        reject(error);
      });
  });
}

// Get cover image URL from formats
export function getCoverImage(formats: Record<string, string>): string {
  const jpegKey = Object.keys(formats).find(key => key.includes('image/jpeg'));
  if (jpegKey) return formats[jpegKey];
  
  const pngKey = Object.keys(formats).find(key => key.includes('image/png'));
  if (pngKey) return formats[pngKey];
  
  const gifKey = Object.keys(formats).find(key => key.includes('image/gif'));
  if (gifKey) return formats[gifKey];
  
  return '';
}

// Get author name from authors array
export function getAuthorName(authors: GutendexBook['authors']): string {
  if (!authors || authors.length === 0) return 'Unknown Author';
  return authors[0].name;
}
