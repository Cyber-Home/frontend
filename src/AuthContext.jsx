import React, { createContext, useState, useContext } from 'react';

// Create the Auth Context
export const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  // const [user, setUser] = useState(null); // uncomment this when done

    // Temporarily set a default admin user
    const [user, setUser] = useState({ role: 'admin' });

  const login = (userData) => {
    setUser(userData); // Set the user data on login
  };

  const logout = () => {
    setUser(null); // Clear the user data on logout
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a custom hook for easier access to the context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider'); // Error handling if used outside the provider
  }
  return context;
};


export default AuthProvider; 
