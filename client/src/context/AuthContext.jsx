import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { registerRequest, loginRequest, meRequest } from '../api/auth';

const AuthContext = createContext(null);
const TOKEN_KEY = 'shalom_token';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // true until we've checked for an existing session

  // On first load, if a token is already stored, verify it's still valid and
  // hydrate the user — this is what keeps someone logged in across refreshes.
  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      setLoading(false);
      return;
    }

    meRequest()
      .then(({ user: fetchedUser }) => setUser(fetchedUser))
      .catch(() => {
        // Token expired/invalid — clear it so we don't keep retrying
        localStorage.removeItem(TOKEN_KEY);
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback(async ({ email, password }) => {
    const { token, user: loggedInUser } = await loginRequest({ email, password });
    localStorage.setItem(TOKEN_KEY, token);
    setUser(loggedInUser);
    return loggedInUser;
  }, []);

  const register = useCallback(async ({ email, password, name }) => {
    const { token, user: newUser } = await registerRequest({ email, password, name });
    localStorage.setItem(TOKEN_KEY, token);
    setUser(newUser);
    return newUser;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}