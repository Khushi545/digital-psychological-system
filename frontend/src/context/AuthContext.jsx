import React, { createContext, useState, useEffect } from 'react';
import api from '../api';

export const AuthContext = createContext();

// Local anonymous login fallback when backend is unavailable
const createLocalAnonUser = () => {
  const anonymousId = 'anon_' + Math.random().toString(36).substr(2, 9);
  const fakeToken = 'local_anon_' + Date.now();
  const user = {
    id: anonymousId,
    anonymousId,
    isAnonymous: true,
    role: 'student',
    name: null,
    email: null,
  };
  localStorage.setItem('token', fakeToken);
  localStorage.setItem('anon_user', JSON.stringify(user));
  return { token: fakeToken, user };
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        // Check if it's a local anonymous token
        if (token.startsWith('local_anon_')) {
          const stored = localStorage.getItem('anon_user');
          if (stored) {
            setUser(JSON.parse(stored));
          }
          setLoading(false);
          return;
        }
        try {
          const res = await api.get('/auth/me');
          setUser(res.data.data);
        } catch (err) {
          console.error(err);
          localStorage.removeItem('token');
          localStorage.removeItem('anon_user');
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };
    loadUser();
  }, [token]);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', res.data.token);
    setToken(res.data.token);
    setUser(res.data.user);
  };

  const register = async (name, email, password, role) => {
    const res = await api.post('/auth/register', { name, email, password, role });
    localStorage.setItem('token', res.data.token);
    setToken(res.data.token);
    setUser(res.data.user);
  };

  const loginAnonymous = async () => {
    try {
      // Try backend first
      const res = await api.post('/auth/anonymous');
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      setUser(res.data.user);
    } catch (err) {
      // Fallback: create local anonymous session when backend is unavailable
      console.warn('Backend unavailable, creating local anonymous session');
      const { token: localToken, user: localUser } = createLocalAnonUser();
      setToken(localToken);
      setUser(localUser);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('anon_user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, loginAnonymous, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
