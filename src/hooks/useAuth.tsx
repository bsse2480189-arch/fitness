import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '../types';
import { dataSource } from '../services/DataSource';

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  login: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initial load - mock auto-login for user123
    const init = async () => {
      try {
        const profile = await dataSource.getUser('user123');
        setUser(profile);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const login = async (email: string) => {
    setLoading(true);
    try {
      // Simple mock login
      const profile = await dataSource.getUser('user123');
      setUser(profile);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setUser(null);
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAdmin }}>
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
