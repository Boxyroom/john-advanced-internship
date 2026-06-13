'use client';

import { useEffect, useState } from 'react';
import AppLayout from '@/components/AppLayout';
import BookCard, { type BookCardData } from '@/components/BookCard';
import { useAuth } from '@/components/AuthContext';
import { getBook, type Book } from '@/lib/booksApi';
import { getFinishedBookIds, getSavedBookIds } from '@/lib/library';
import styles from './Library.module.css';

function uniqueBookIds(bookIds: string[]) {
  return Array.from(new Set(bookIds));
}

async function getBooksByIds(bookIds: string[]) {
  const books = await Promise.all(
    uniqueBookIds(bookIds).map((bookId) => getBook(bookId).catch(() => null)),
  );

  return books.filter((book): book is Book => Boolean(book?.id));
}

type LibrarySectionProps = {
  books: BookCardData[];
  emptyMessage: string;
  title: string;
};

function LibrarySection({ books, emptyMessage, title }: LibrarySectionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>{title}</h2>
      </div>

      {books.length > 0 ? (
        <div className={styles.bookGrid}>
          {books.map((book) => (
            <BookCard book={book} key={book.id} />
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>{emptyMessage}</div>
      )}
    </section>
  );
}

export default function LibraryPage() {
  const { isAuthenticated, openAuthModal, user } = useAuth();
  const [savedBooks, setSavedBooks] = useState<BookCardData[]>([]);
  const [finishedBooks, setFinishedBooks] = useState<BookCardData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isCurrent = true;

    async function loadLibraryBooks() {
      if (!user?.email) {
        setSavedBooks([]);
        setFinishedBooks([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      const [nextSavedBooks, nextFinishedBooks] = await Promise.all([
        getBooksByIds(getSavedBookIds(user.email)),
        getBooksByIds(getFinishedBookIds(user.email)),
      ]);

      if (!isCurrent) {
        return;
      }

      setSavedBooks(nextSavedBooks);
      setFinishedBooks(nextFinishedBooks);
      setIsLoading(false);
    }

    loadLibraryBooks();

    return () => {
      isCurrent = false;
    };
  }, [user?.email]);

  return (
    <AppLayout>
      <div className={styles.page}>
        <section className={styles.header}>
          <p className={styles.eyebrow}>Saved</p>
          <h1 className={styles.title}>Library</h1>
          <p className={styles.description}>
            Keep track of saved books and summaries you have finished.
          </p>
        </section>

        {!isAuthenticated ? (
          <section className={styles.loggedOutState}>
            <h2 className={styles.emptyTitle}>Log in to view your library</h2>
            <p className={styles.emptyDescription}>
              Saved and finished books are stored with your account.
            </p>
            <button
              className={styles.loginButton}
              type="button"
              onClick={() => openAuthModal('login')}
            >
              Login
            </button>
          </section>
        ) : (
          <>
            {isLoading ? <div className={styles.loadingState}>Loading library...</div> : null}
            <LibrarySection
              books={savedBooks}
              emptyMessage="You have not saved any books yet."
              title="Saved Books"
            />
            <LibrarySection
              books={finishedBooks}
              emptyMessage="Finished books will appear here after you reach the end of a player."
              title="Finished Books"
            />
          </>
        )}
      </div>
    </AppLayout>
  );
}
