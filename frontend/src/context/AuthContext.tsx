'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from 'react';
import {
  login as apiLogin,
  register as apiRegister,
  logout as apiLogout,
  User,
} from '../lib/api';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    // The cookie is httpOnly, so we rely on a simple flag in localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const { user } = await apiLogin(email, password);
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  }, []);

  const register = useCallback(
    async (email: string, password: string, name: string) => {
      const { user } = await apiRegister(email, password, name);
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
    },
    [],
  );

  const logout = useCallback(async () => {
    await apiLogout();
    setUser(null);
    localStorage.removeItem('user');
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}