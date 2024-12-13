import React, { createContext, useState, useContext, use } from 'react';
import { useRouter } from 'next/router';

// Create the AuthContext
const AuthContext = createContext();

// Custom hook to access AuthContext
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // User state
  const router = useRouter();
  const [authenicated, setauthenticated] = useState(false); // User state

  // Login function
  const login = async (email, password) => {
    console.log(email,password);
    try {
      const res = await fetch('http://localhost:3000//api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email:email, password:password }),
      });
console.log(res);
      if (res.ok) {
        const userData = await res.json();
        console.log(userData);
        const data=userData.books;
        setUser({
          id: data.id,
          email:data.email,
        });
        console.log(user);
        setauthenticated(true);
        router.push('/'); // Redirect to homepage
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setauthenticated(false);
    router.push('/login'); // Redirect to login page
  };

  // Context value
  const value = { user, login, logout,authenicated,setauthenticated };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
