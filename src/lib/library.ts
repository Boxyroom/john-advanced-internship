const SAVED_BOOKS_KEY = 'summarist-library-saved-book-ids';
const FINISHED_BOOKS_KEY = 'summarist-library-finished-book-ids';

type StoredBookIds = Record<string, string[]>;

function canUseStorage() {
  return typeof window !== 'undefined';
}

function normalizeEmail(email: string | null | undefined) {
  return email?.trim().toLowerCase() ?? '';
}

function getStoredBookIds(storageKey: string): StoredBookIds {
  if (!canUseStorage()) {
    return {};
  }

  const storedBookIds = window.localStorage.getItem(storageKey);

  if (!storedBookIds) {
    return {};
  }

  try {
    const parsedBookIds = JSON.parse(storedBookIds) as Record<string, unknown>;

    return Object.entries(parsedBookIds).reduce<StoredBookIds>(
      (bookIdsByEmail, [email, bookIds]) => {
        const normalizedEmail = normalizeEmail(email);

        if (!normalizedEmail || !Array.isArray(bookIds)) {
          return bookIdsByEmail;
        }

        bookIdsByEmail[normalizedEmail] = Array.from(
          new Set(bookIds.filter((bookId): bookId is string => typeof bookId === 'string')),
        );

        return bookIdsByEmail;
      },
      {},
    );
  } catch {
    return {};
  }
}

function getBookIds(email: string | null | undefined, storageKey: string) {
  const normalizedEmail = normalizeEmail(email);

  if (!normalizedEmail) {
    return [];
  }

  return getStoredBookIds(storageKey)[normalizedEmail] ?? [];
}

function addBookId(email: string | null | undefined, bookId: string, storageKey: string) {
  if (!canUseStorage()) {
    return;
  }

  const normalizedEmail = normalizeEmail(email);

  if (!normalizedEmail) {
    return;
  }

  const storedBookIds = getStoredBookIds(storageKey);
  const bookIds = storedBookIds[normalizedEmail] ?? [];

  if (bookIds.includes(bookId)) {
    return;
  }

  storedBookIds[normalizedEmail] = [...bookIds, bookId];
  window.localStorage.setItem(storageKey, JSON.stringify(storedBookIds));
}

function clearBookIds(email: string | null | undefined, storageKey: string) {
  if (!canUseStorage()) {
    return;
  }

  const normalizedEmail = normalizeEmail(email);

  if (!normalizedEmail) {
    return;
  }

  const storedBookIds = getStoredBookIds(storageKey);
  delete storedBookIds[normalizedEmail];
  window.localStorage.setItem(storageKey, JSON.stringify(storedBookIds));
}

export function getSavedBookIds(email: string | null | undefined) {
  return getBookIds(email, SAVED_BOOKS_KEY);
}

export function saveBookToLibrary(email: string | null | undefined, bookId: string) {
  addBookId(email, bookId, SAVED_BOOKS_KEY);
}

export function isBookSaved(email: string | null | undefined, bookId: string) {
  return getSavedBookIds(email).includes(bookId);
}

export function getFinishedBookIds(email: string | null | undefined) {
  return getBookIds(email, FINISHED_BOOKS_KEY);
}

export function markBookFinished(email: string | null | undefined, bookId: string) {
  addBookId(email, bookId, FINISHED_BOOKS_KEY);
}

export function clearLibraryForUser(email: string | null | undefined) {
  clearBookIds(email, SAVED_BOOKS_KEY);
  clearBookIds(email, FINISHED_BOOKS_KEY);
}
