'use client';

import { useRouter } from 'next/navigation';
import { FiBookOpen, FiBookmark, FiHeadphones } from 'react-icons/fi';
import { useAuth } from '@/components/AuthContext';
import type { Book } from '@/lib/booksApi';
import styles from './BookDetails.module.css';

type SavedBook = Pick<Book, 'id' | 'title' | 'author' | 'subTitle' | 'imageLink'>;

type BookActionsProps = {
  book: SavedBook;
};

const SAVED_BOOKS_KEY = 'summarist-library-books';

function getSavedBooks() {
  const storedBooks = window.localStorage.getItem(SAVED_BOOKS_KEY);

  if (!storedBooks) {
    return [];
  }

  try {
    return JSON.parse(storedBooks) as SavedBook[];
  } catch {
    return [];
  }
}

export default function BookActions({ book }: BookActionsProps) {
  const router = useRouter();
  const { isAuthenticated, openAuthModal } = useAuth();

  function requireAuth() {
    if (isAuthenticated) {
      return true;
    }

    openAuthModal('login');
    return false;
  }

  function openPlayer() {
    if (!requireAuth()) {
      return;
    }

    router.push(`/player/${book.id}`);
  }

  function saveToLibrary() {
    if (!requireAuth()) {
      return;
    }

    const savedBooks = getSavedBooks();
    const alreadySaved = savedBooks.some((savedBook) => savedBook.id === book.id);

    if (alreadySaved) {
      return;
    }

    window.localStorage.setItem(
      SAVED_BOOKS_KEY,
      JSON.stringify([...savedBooks, book]),
    );
  }

  return (
    <div className={styles.actions}>
      <button className={styles.primaryAction} type="button" onClick={openPlayer}>
        <FiBookOpen size={18} />
        Read
      </button>
      <button className={styles.primaryAction} type="button" onClick={openPlayer}>
        <FiHeadphones size={18} />
        Listen
      </button>
      <button className={styles.secondaryAction} type="button" onClick={saveToLibrary}>
        <FiBookmark size={18} />
        Add to Library
      </button>
    </div>
  );
}
