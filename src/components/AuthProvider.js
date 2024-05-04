import {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [userName, setUserName] = useState('');
  const [user, setUser] = useState()

  const login = async (email, password) => {
    const response = await axios.post('http://localhost:8081/auth/signin', { email, password });
    localStorage.setItem('token', response.data.jwt);
    setUser(response.data.user)
    setUserName(response.data.user.fullName)
    setToken(response.data.jwt);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
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