import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Login from './Login';
import './ProtectedRoute.css';

const ProtectedRoute = ({ children, fallback }) => {
  const { isAuthenticated, loading } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  if (loading) {
    return (
      <div className="protected-loading">
        <div className="loading-spinner"></div>
        <p>Checking authentication...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="protected-route">
        {fallback || (
          <div className="auth-required">
            <div className="auth-content">
              <div className="auth-icon">🔒</div>
              <h2>Authentication Required</h2>
              <p>You need to be logged in to access this page.</p>
              <button 
                className="login-trigger-btn"
                onClick={() => setShowLogin(true)}
              >
                Login to Continue
              </button>
            </div>
          </div>
        )}
        
        {showLogin && (
          <Login onClose={() => setShowLogin(false)} />
        )}
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
