import {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [userName, setUserName] = useState(localStorage.getItem('userName') || '');
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {})

  const login = async (email, password) => {
    const response = await axios.post('http://localhost:8081/auth/signin', { email, password });
    localStorage.setItem('token', response.data.jwt);
    localStorage.setItem('userName', response.data.user.fullName);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    setUser(response.data.user)
    setUserName(response.data.user.fullName)
    setToken(response.data.jwt);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('user');
    setToken(null);
    setIsLoggedIn(false);
    setUserName('');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, isLoggedIn, login, logout, userName, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);