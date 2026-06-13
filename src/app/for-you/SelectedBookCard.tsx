'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FiPlay } from 'react-icons/fi';
import AudioDuration from '@/components/AudioDuration';
import type { Book } from '@/lib/booksApi';
import styles from './ForYou.module.css';

type SelectedBookCardProps = {
  book: Pick<
    Book,
    'id' | 'title' | 'author' | 'subTitle' | 'imageLink' | 'audioLink' | 'subscriptionRequired'
  >;
};

export default function SelectedBookCard({ book }: SelectedBookCardProps) {
  return (
    <Link
      className={styles.selectedCard}
      href={`/book/${book.id}`}
      aria-label={`View details for ${book.title}`}
    >
      <div className={styles.selectedCopy}>
        <p className={styles.selectedIntro}>{book.subTitle}</p>
        <div className={styles.selectedDivider} />
        <div className={styles.selectedMeta}>
          <div className={styles.selectedTitleRow}>
            <span className={styles.playButton} aria-hidden="true">
              <FiPlay size={17} />
            </span>
            <h3 className={styles.selectedTitle}>{book.title}</h3>
          </div>
          <p className={styles.selectedAuthor}>{book.author}</p>
          <p className={styles.selectedDuration}>
            <AudioDuration audioLink={book.audioLink} />
          </p>
        </div>
      </div>
      <Image
        className={styles.selectedImage}
        src={book.imageLink}
        alt={`${book.title} cover`}
        width={341}
        height={512}
        sizes="(max-width: 576px) 104px, 140px"
        priority
      />
    </Link>
  );
}
