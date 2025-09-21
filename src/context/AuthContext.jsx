import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem('auth_user');
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  });

  const [token, setToken] = useState(() => localStorage.getItem('auth_token') || null);

  useEffect(() => {
    if (user) localStorage.setItem('auth_user', JSON.stringify(user));
    else localStorage.removeItem('auth_user');
  }, [user]);

  useEffect(() => {
    if (token) localStorage.setItem('auth_token', token);
    else localStorage.removeItem('auth_token');
  }, [token]);

  // User storage system using localStorage
  const getStoredUsers = () => {
    try {
      const users = localStorage.getItem('registered_users');
      return users ? JSON.parse(users) : [];
    } catch (e) {
      return [];
    }
  };

  const saveUser = (userData) => {
    try {
      const users = getStoredUsers();
      const existingIndex = users.findIndex(u => u.email === userData.email);
      if (existingIndex >= 0) {
        users[existingIndex] = userData;
      } else {
        users.push(userData);
      }
      localStorage.setItem('registered_users', JSON.stringify(users));
    } catch (e) {
      console.error('Failed to save user:', e);
    }
  };

  const findUser = (email, password) => {
    const users = getStoredUsers();
    return users.find(u => u.email === email && u.password === password);
  };

  // Mock credentials (fallback for demo purposes)
  const MOCK_EMAIL = 'admin@medic.com';
  const MOCK_PASSWORD = 'password123';

  const login = async ({ email, password }) => {
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 300));
    
    // First check registered users
    const registeredUser = findUser(email, password);
    if (registeredUser) {
      const fakeToken = 'fake-jwt-token-' + Date.now();
      const fakeUser = { 
        id: registeredUser.id || Date.now(), 
        name: registeredUser.name, 
        email: registeredUser.email 
      };
      setUser(fakeUser);
      setToken(fakeToken);
      return { user: fakeUser, token: fakeToken };
    }
    
    // Fallback to mock credentials for demo
    if (email === MOCK_EMAIL && password === MOCK_PASSWORD) {
      const fakeToken = 'fake-jwt-token-' + Date.now();
      const fakeUser = { id: 1, name: 'Admin', email };
      setUser(fakeUser);
      setToken(fakeToken);
      return { user: fakeUser, token: fakeToken };
    }
    
    const err = new Error('Invalid credentials');
    err.code = 401;
    throw err;
  };

  const register = async ({ name, email, password }) => {
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 300));
    
    // Check if user already exists
    const existingUsers = getStoredUsers();
    const existingUser = existingUsers.find(u => u.email === email);
    
    if (existingUser) {
      const err = new Error('User already exists with this email');
      err.code = 409;
      throw err;
    }
    
    // Create new user
    const newUser = {
      id: Date.now(),
      name: name || email.split('@')[0],
      email,
      password, // In real app, this would be hashed
      createdAt: new Date().toISOString()
    };
    
    // Save user to storage
    saveUser(newUser);
    
    // Return success (don't auto-login for security)
    return { success: true, message: 'Registration successful' };
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
