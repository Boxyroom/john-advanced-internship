'use client';

import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useSyncExternalStore,
} from 'react';
import { useRouter } from 'next/navigation';
import AuthModal from './AuthModal';

type AuthMode = 'login' | 'register';

type AuthUser = {
  email: string;
};

type StoredUser = {
  email: string;
  password: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  openAuthModal: (mode?: AuthMode) => void;
  closeAuthModal: () => void;
  login: (email: string, password: string) => string | null;
  register: (email: string, password: string) => string | null;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const AUTH_USER_KEY = 'summarist-auth-user';
const REGISTERED_USER_KEY = 'summarist-registered-user';
const AUTH_CHANGE_EVENT = 'summarist-auth-change';
const guestUser: StoredUser = {
  email: 'guest@gmail.com',
  password: 'guest123',
};

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function getRegisteredUser(): StoredUser | null {
  const storedUser = window.localStorage.getItem(REGISTERED_USER_KEY);

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser) as StoredUser;
  } catch {
    return null;
  }
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function notifyAuthChange() {
  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
}

function subscribeToAuthChanges(onStoreChange: () => void) {
  window.addEventListener('storage', onStoreChange);
  window.addEventListener(AUTH_CHANGE_EVENT, onStoreChange);

  return () => {
    window.removeEventListener('storage', onStoreChange);
    window.removeEventListener(AUTH_CHANGE_EVENT, onStoreChange);
  };
}

function getAuthSnapshot() {
  return window.localStorage.getItem(AUTH_USER_KEY);
}

function getServerAuthSnapshot() {
  return null;
}

function parseAuthUser(snapshot: string | null) {
  if (!snapshot) {
    return null;
  }

  try {
    return JSON.parse(snapshot) as AuthUser;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const authSnapshot = useSyncExternalStore(
    subscribeToAuthChanges,
    getAuthSnapshot,
    getServerAuthSnapshot,
  );
  const user = parseAuthUser(authSnapshot);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>('login');

  function persistAuthUser(nextUser: AuthUser) {
    window.localStorage.setItem(AUTH_USER_KEY, JSON.stringify(nextUser));
    notifyAuthChange();
    setIsModalOpen(false);
    router.push('/for-you');
  }

  function openAuthModal(mode: AuthMode = 'login') {
    setAuthMode(mode);
    setIsModalOpen(true);
  }

  function closeAuthModal() {
    setIsModalOpen(false);
  }

  function register(email: string, password: string) {
    const normalizedEmail = normalizeEmail(email);

    if (!isValidEmail(normalizedEmail)) {
      return 'Please enter a valid email address.';
    }

    if (password.length < 6) {
      return 'Password must be at least 6 characters.';
    }

    const nextUser = { email: normalizedEmail, password };
    window.localStorage.setItem(REGISTERED_USER_KEY, JSON.stringify(nextUser));
    persistAuthUser({ email: normalizedEmail });

    return null;
  }

  function login(email: string, password: string) {
    const normalizedEmail = normalizeEmail(email);

    if (!isValidEmail(normalizedEmail)) {
      return 'Please enter a valid email address.';
    }

    if (password.length < 6) {
      return 'Password must be at least 6 characters.';
    }

    const registeredUser = getRegisteredUser();
    const matchingUser =
      normalizedEmail === guestUser.email ? guestUser : registeredUser;

    if (!matchingUser || matchingUser.email !== normalizedEmail) {
      return 'User not found.';
    }

    if (matchingUser.password !== password) {
      return 'Incorrect password.';
    }

    persistAuthUser({ email: normalizedEmail });

    return null;
  }

  function logout() {
    window.localStorage.removeItem(AUTH_USER_KEY);
    notifyAuthChange();
  }

  const value = {
    user,
    isAuthenticated: Boolean(user),
    openAuthModal,
    closeAuthModal,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
      <AuthModal
        isOpen={isModalOpen}
        mode={authMode}
        onModeChange={setAuthMode}
        onClose={closeAuthModal}
      />
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}
