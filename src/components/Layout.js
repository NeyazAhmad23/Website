import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Layout.css';

const Layout = ({ children }) => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'nav-link active' : 'nav-link';
  };

  return (
    <div className="layout">
      <header className="header">
        <nav className="nav">
          <Link to="/" className="logo">
            Neyaz Ahmad
          </Link>
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
          </ul>
        </nav>
      </header>
      
      <main className="main-content">
        {children}
      </main>
      
      <footer className="footer">
        <p>&copy; 2024 My Personal Website. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
