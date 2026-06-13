'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { BiSearch } from 'react-icons/bi';
import styles from './AppLayout.module.css';

function getSearchHref(search: string) {
  const trimmedSearch = search.trim();

  if (!trimmedSearch) {
    return '/search';
  }

  return `/search?search=${encodeURIComponent(trimmedSearch)}`;
}

export default function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentSearch = searchParams.get('search') ?? '';
  const [query, setQuery] = useState(currentSearch);
  const pendingNavigationSearchRef = useRef<string | null>(null);

  useEffect(() => {
    if (pathname !== '/search') {
      return;
    }

    if (pendingNavigationSearchRef.current === currentSearch) {
      pendingNavigationSearchRef.current = null;
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setQuery(currentSearch);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [currentSearch, pathname]);

  useEffect(() => {
    const trimmedQuery = query.trim();

    if (!trimmedQuery && pathname !== '/search') {
      return;
    }

    if (pathname === '/search' && trimmedQuery === currentSearch) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      pendingNavigationSearchRef.current = trimmedQuery;

      if (pathname === '/search') {
        router.replace(getSearchHref(query));
        return;
      }

      router.push(getSearchHref(query));
    }, 300);

    return () => window.clearTimeout(timeoutId);
  }, [currentSearch, pathname, query, router]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    pendingNavigationSearchRef.current = query.trim();
    router.push(getSearchHref(query));
  }

  return (
    <form className={styles.searchForm} role="search" onSubmit={handleSubmit}>
      <span className={styles.searchIcon} aria-hidden="true">
        <BiSearch size={22} />
      </span>
      <input
        className={styles.searchInput}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        type="search"
        placeholder="Search books"
        aria-label="Search books"
      />
    </form>
  );
}
