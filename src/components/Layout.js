import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import ThemeToggle from './ThemeToggle';
import Login from './Login';
import './Layout.css';

const Layout = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  const isActive = (path) => {
    return location.pathname === path ? 'nav-link active' : 'nav-link';
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="layout">
      <header className="header">
        <nav className="nav">
          <Link to="/" className="logo">
            Neyaz Ahmad
          </Link>
          <div className="nav-right">
            <ul className="nav-links">
            <li>
              <Link to="/" className={isActive('/')}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className={isActive('/about')}>
                About Me
              </Link>
            </li>
            <li>
              <Link to="/family" className={isActive('/family')}>
                Family
              </Link>
            </li>
            <li>
              <Link to="/blog" className={isActive('/blog')}>
                Blog
              </Link>
            </li>
            {isAuthenticated && (
              <li>
                <Link to="/photos" className={isActive('/photos')}>
                  Photos
                </Link>
              </li>
            )}
          </ul>
          <div className="nav-auth">
            {isAuthenticated ? (
              <div className="user-menu">
                <span className="user-greeting">Hi, {user?.name || user?.username}!</span>
                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            ) : (
              <button className="login-btn" onClick={() => setShowLogin(true)}>
                Login
              </button>
            )}
          </div>
          <ThemeToggle />
          </div>
        </nav>
      </header>
      
      <main className="main-content">
        {children}
      </main>
      
      <footer className="footer">
        <p>&copy; 2024 My Personal Website. All rights reserved.</p>
      </footer>
      
      {showLogin && (
        <Login onClose={() => setShowLogin(false)} />
      )}
    </div>
  );
};

export default Layout;
