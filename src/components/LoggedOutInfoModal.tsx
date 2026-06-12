'use client';

import styles from './LoggedOutInfoModal.module.css';

type LoggedOutInfoModalProps = {
  onClose: () => void;
  onLogin: () => void;
};

export default function LoggedOutInfoModal({
  onClose,
  onLogin,
}: LoggedOutInfoModalProps) {
  return (
    <div className={styles.backdrop} role="presentation" onMouseDown={onClose}>
      <section
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="logged-out-info-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <h2 className={styles.title} id="logged-out-info-title">
          You&apos;re Not Logged In
        </h2>
        <p className={styles.message}>
          You can browse this page without logging in, but some features may be
          limited until you sign in or create an account.
        </p>
        <p className={styles.message}>
          This project allows open navigation for demonstration purposes, so
          you&apos;re welcome to continue exploring.
        </p>
        <div className={styles.actions}>
          <button className={styles.loginButton} type="button" onClick={onLogin}>
            Login
          </button>
          <button
            className={styles.understandButton}
            type="button"
            onClick={onClose}
          >
            I Understand
          </button>
        </div>
      </section>
    </div>
  );
}
