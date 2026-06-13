export type Book = {
  id: string;
  author: string;
  title: string;
  subTitle: string;
  imageLink: string;
  audioLink: string;
  totalRating: number;
  averageRating: number;
  keyIdeas: number;
  type: string;
  status: string;
  subscriptionRequired: boolean;
  summary: string;
  tags: string[];
  bookDescription: string;
  authorDescription: string;
};

const API_BASE_URL = 'https://us-central1-summaristt.cloudfunctions.net';

async function fetchBookApi<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Book API request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export function getSelectedBook() {
  return fetchBookApi<Book>('/getBook?status=selected');
}

export function getBook(id: string) {
  return fetchBookApi<Book>(`/getBook?id=${encodeURIComponent(id)}`);
}

export function getRecommendedBooks() {
  return fetchBookApi<Book[]>('/getBooks?status=recommended');
}

export function getSuggestedBooks() {
  return fetchBookApi<Book[]>('/getBooks?status=suggested');
}

export function getBooksByAuthorOrTitle(search: string) {
  return fetchBookApi<Book[]>(
    `/getBooksByAuthorOrTitle?search=${encodeURIComponent(search)}`,
  );
}
