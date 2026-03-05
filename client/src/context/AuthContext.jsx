import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../utils/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem('token'),
    userRole: localStorage.getItem('userRole'),
    username: localStorage.getItem('username')
  });

  useEffect(() => {
    localStorage.setItem('token', auth.token || '');
    localStorage.setItem('userRole', auth.userRole || '');
    localStorage.setItem('username', auth.username || '');
  }, [auth]);

  const login = (token, role, username) => {
    setAuth({ token, userRole: role, username });
  };

  const logout = () => {
    setAuth({ token: null, userRole: null, username: null });
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('username');
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};