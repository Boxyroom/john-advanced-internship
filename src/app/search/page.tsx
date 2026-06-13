import AppLayout from '@/components/AppLayout';
import BookCard from '@/components/BookCard';
import { getBooksByAuthorOrTitle } from '@/lib/booksApi';
import styles from './Search.module.css';

export const dynamic = 'force-dynamic';

type SearchPageProps = {
  searchParams?: Promise<{
    search?: string | string[];
  }>;
};

function getSearchQuery(search?: string | string[]) {
  if (Array.isArray(search)) {
    return search[0]?.trim() ?? '';
  }

  return search?.trim() ?? '';
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = getSearchQuery(params?.search);
  const books = query ? await getBooksByAuthorOrTitle(query) : [];

  return (
    <AppLayout>
      <div className={styles.page}>
        <section className={styles.header}>
          <p className={styles.eyebrow}>Discover</p>
          <h1 className={styles.title}>Search</h1>
          <p className={styles.description}>
            {query
              ? `Showing results for "${query}"`
              : 'Search by book title or author to find your next summary.'}
          </p>
        </section>

        {query && books.length > 0 ? (
          <section className={styles.results} aria-label="Search results">
            {books.map((book) => (
              <BookCard book={book} key={book.id} />
            ))}
          </section>
        ) : (
          <section className={styles.emptyState}>
            <h2 className={styles.emptyTitle}>
              {query ? 'No books found' : 'Start searching'}
            </h2>
            <p className={styles.emptyDescription}>
              {query
                ? 'Try another title, author, or a shorter search term.'
                : 'Type a book title or author in the search bar above.'}
            </p>
          </section>
        )}
      </div>
    </AppLayout>
  );
}
