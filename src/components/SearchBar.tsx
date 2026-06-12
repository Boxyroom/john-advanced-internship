'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BiSearch } from 'react-icons/bi';
import styles from './AppLayout.module.css';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push('/search');
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
