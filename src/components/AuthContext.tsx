'use client';

import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useSyncExternalStore,
} from 'react';
import { useRouter } from 'next/navigation';
import { clearLibraryForUser } from '@/lib/library';
import { clearSubscription } from '@/lib/subscription';
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
  isGuest: boolean;
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
export const GUEST_EMAIL = 'guest@gmail.com';
const guestUser: StoredUser = {
  email: GUEST_EMAIL,
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

function clearGuestProgressData() {
  const progressKeys = Object.keys(window.localStorage).filter(
    (key) => key.startsWith('summarist-') && key.includes('progress'),
  );

  progressKeys.forEach((key) => {
    if (key.includes(GUEST_EMAIL)) {
      window.localStorage.removeItem(key);
      return;
    }

    const storedProgress = window.localStorage.getItem(key);

    if (!storedProgress) {
      return;
    }

    try {
      const parsedProgress = JSON.parse(storedProgress) as Record<string, unknown>;

      if (Object.prototype.hasOwnProperty.call(parsedProgress, GUEST_EMAIL)) {
        delete parsedProgress[GUEST_EMAIL];
        window.localStorage.setItem(key, JSON.stringify(parsedProgress));
      }
    } catch {
      // Ignore non-JSON progress keys; none are currently used by the app.
    }
  });
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const authSnapshot = useSyncExternalStore(
    subscribeToAuthChanges,
    getAuthSnapshot,
    getServerAuthSnapshot,
  );
  const user = parseAuthUser(authSnapshot);
  const isGuest = user?.email === GUEST_EMAIL;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [authModalKey, setAuthModalKey] = useState(0);

  function persistAuthUser(nextUser: AuthUser) {
    window.localStorage.setItem(AUTH_USER_KEY, JSON.stringify(nextUser));
    notifyAuthChange();
    setIsModalOpen(false);
    router.push('/for-you');
  }

  function openAuthModal(mode: AuthMode = 'login') {
    setAuthModalKey((currentKey) => currentKey + 1);
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
      normalizedEmail === GUEST_EMAIL ? guestUser : registeredUser;

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
    if (isGuest) {
      clearLibraryForUser(GUEST_EMAIL);
      clearSubscription(GUEST_EMAIL);
      clearGuestProgressData();
    }

    window.localStorage.removeItem(AUTH_USER_KEY);
    notifyAuthChange();
  }

  const value = {
    user,
    isAuthenticated: Boolean(user),
    isGuest,
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
        key={authModalKey}
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
