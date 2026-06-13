'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiBookOpen, FiBookmark, FiHeadphones } from 'react-icons/fi';
import { FaBookmark } from 'react-icons/fa';
import { useAuth } from '@/components/AuthContext';
import type { Book } from '@/lib/booksApi';
import { isBookSaved, saveBookToLibrary } from '@/lib/library';
import { getSubscription, hasPremiumAccess } from '@/lib/subscription';
import styles from './BookDetails.module.css';

type SavedBook = Pick<
  Book,
  'id' | 'title' | 'author' | 'subTitle' | 'imageLink' | 'subscriptionRequired'
>;

type BookActionsProps = {
  book: SavedBook;
};

export default function BookActions({ book }: BookActionsProps) {
  const router = useRouter();
  const { isAuthenticated, openAuthModal, user } = useAuth();
  const [savedBookState, setSavedBookState] = useState({
    bookId: book.id,
    email: user?.email ?? null,
    isSaved: isBookSaved(user?.email, book.id),
  });
  let isSaved = savedBookState.isSaved;

  if (
    savedBookState.bookId !== book.id ||
    savedBookState.email !== (user?.email ?? null)
  ) {
    isSaved = isBookSaved(user?.email, book.id);
    setSavedBookState({
      bookId: book.id,
      email: user?.email ?? null,
      isSaved,
    });
  }

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

    const subscription = getSubscription(user?.email, isAuthenticated);

    if (book.subscriptionRequired && !hasPremiumAccess(subscription)) {
      router.push('/choose-plan');
      return;
    }

    router.push(`/player/${book.id}`);
  }

  function saveToLibrary() {
    if (!requireAuth()) {
      return;
    }

    saveBookToLibrary(user?.email, book.id);
    setSavedBookState({
      bookId: book.id,
      email: user?.email ?? null,
      isSaved: true,
    });
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
        {isSaved ? (
          <FaBookmark className={styles.savedIcon} size={18} />
        ) : (
          <FiBookmark size={18} />
        )}
        {isSaved ? 'Saved to Library' : 'Save to Library'}
      </button>
    </div>
  );
}
