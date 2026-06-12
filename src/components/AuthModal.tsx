'use client';

import { FormEvent, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { useAuth } from './AuthContext';
import styles from './AuthModal.module.css';

type AuthMode = 'login' | 'register';

type AuthModalProps = {
  isOpen: boolean;
  mode: AuthMode;
  onModeChange: (mode: AuthMode) => void;
  onClose: () => void;
};

export default function AuthModal({
  isOpen,
  mode,
  onModeChange,
  onClose,
}: AuthModalProps) {
  const { login, register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) {
    return null;
  }

  function resetForm() {
    setEmail('');
    setPassword('');
    setError('');
  }

  function handleModeChange(nextMode: AuthMode) {
    resetForm();
    onModeChange(nextMode);
  }

  function handleClose() {
    resetForm();
    onClose();
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const authError =
      mode === 'login' ? login(email, password) : register(email, password);

    setError(authError ?? '');
  }

  function handleGuestLogin() {
    const authError = login('guest@gmail.com', 'guest123');
    setError(authError ?? '');
  }

  return (
    <div className={styles.backdrop} role="presentation" onMouseDown={handleClose}>
      <section
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className={styles.header}>
          <h2 className={styles.title} id="auth-modal-title">
            {mode === 'login' ? 'Login to Summarist' : 'Create your account'}
          </h2>
          <button
            className={styles.closeButton}
            type="button"
            aria-label="Close authentication modal"
            onClick={handleClose}
          >
            <FiX size={22} />
          </button>
        </div>

        <div className={styles.body}>
          <div className={styles.modeToggle}>
            <button
              className={`${styles.modeButton} ${
                mode === 'login' ? styles.modeButtonActive : ''
              }`}
              type="button"
              onClick={() => handleModeChange('login')}
            >
              Login
            </button>
            <button
              className={`${styles.modeButton} ${
                mode === 'register' ? styles.modeButtonActive : ''
              }`}
              type="button"
              onClick={() => handleModeChange('register')}
            >
              Register
            </button>
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.field}>
              <span className={styles.label}>Email</span>
              <input
                className={styles.input}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
              />
            </label>

            <label className={styles.field}>
              <span className={styles.label}>Password</span>
              <input
                className={styles.input}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                placeholder="Password"
              />
            </label>

            {error ? <div className={styles.error}>{error}</div> : null}

            <button className={styles.submitButton} type="submit">
              {mode === 'login' ? 'Login' : 'Register'}
            </button>

            <button className={styles.guestButton} type="button" onClick={handleGuestLogin}>
              Guest Login
            </button>

            <p className={styles.helperText}>
              Guest credentials: guest@gmail.com / guest123
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}
