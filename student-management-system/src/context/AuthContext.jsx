import { createContext, useState, useContext, useEffect } from 'react';
import { getCurrentUser, login as authLogin, logout as authLogout } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    const user = await authLogin(username, password);
    setUser(user);
    return user;
  };

  const logout = () => {
    authLogout();
    setUser(null);
  };

  const value = { user, isAuthenticated: !!user, loading, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};