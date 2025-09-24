import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to My Personal Website</h1>
          <p className="hero-subtitle">
            Discover my journey, meet my family, and explore my thoughts
          </p>
          <div className="hero-buttons">
            <Link to="/about" className="btn btn-primary">
              About Me
            </Link>
            <Link to="/blog" className="btn btn-secondary">
              Read My Blog
            </Link>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2>Explore My World</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>About Me</h3>
              <p>Learn about my background, interests, and professional journey.</p>
              <Link to="/about" className="feature-link">Learn More →</Link>
            </div>
            <div className="feature-card">
              <h3>My Family</h3>
              <p>Meet the wonderful people who make my life complete.</p>
              <Link to="/family" className="feature-link">Meet Them →</Link>
            </div>
            <div className="feature-card">
              <h3>Blog</h3>
              <p>Read my thoughts, experiences, and insights on various topics.</p>
              <Link to="/blog" className="feature-link">Read Posts →</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
