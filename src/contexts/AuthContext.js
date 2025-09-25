import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing authentication on mount
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('authToken');
      const userData = localStorage.getItem('userData');
      
      if (token && userData) {
        try {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Error parsing user data:', error);
          localStorage.removeItem('authToken');
          localStorage.removeItem('userData');
        }
      }
      
      setLoading(false);
    };

    checkAuth();
  }, []);

  // Simple login function (you can replace this with API call)
  const login = async (username, password) => {
    try {
      setLoading(true);
      
      // For now, simple hardcoded authentication
      // Replace this with your actual API call
      if (username === 'admin' && password === 'password123') {
        const userData = {
          id: 1,
          username: 'admin',
          name: 'Administrator',
          email: 'admin@example.com'
        };
        
        const token = 'simple-auth-token-' + Date.now();
        
        // Store in localStorage
        localStorage.setItem('authToken', token);
        localStorage.setItem('userData', JSON.stringify(userData));
        
        setUser(userData);
        setIsAuthenticated(true);
        setLoading(false);
        
        return { success: true };
      } else {
        setLoading(false);
        return { success: false, error: 'Invalid username or password' };
      }
    } catch (error) {
      setLoading(false);
      return { success: false, error: 'Login failed. Please try again.' };
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setUser(null);
    setIsAuthenticated(false);
  };

  // Check if user has specific role/permission (for future use)
  const hasPermission = (permission) => {
    if (!isAuthenticated || !user) return false;
    // Add your permission logic here
    return true; // For now, authenticated users have all permissions
  };

  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    logout,
    hasPermission
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
