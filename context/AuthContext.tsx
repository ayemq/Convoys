import React, { createContext, useContext, ReactNode } from 'react';

// TEMP: Dummy AuthContext for development. Restore real auth logic when ready.
interface AuthContextProps {
  user: null;
  loading: false;
  isVerified: false;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const signOut = async () => {};
  return (
    <AuthContext.Provider value={{ user: null, loading: false, isVerified: false, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}; 