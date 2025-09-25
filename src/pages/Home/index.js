import React, { useState, useEffect } from 'react';
import './Home.css';
import image01 from '../../images/image01.jpg';
import image02 from '../../images/image02.jpg';
import image03 from '../../images/image03.jpg';
import image04 from '../../images/image04.jpg';
import { Link } from 'react-router-dom';

const Home = () => {
  const heroImages = [image01, image02, image03, image04];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return; // Don't start interval if paused

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % heroImages.length
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [heroImages.length, isPaused]);

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  return (
    <div className="home">
      <section className="hero" style={{backgroundImage: `url(${heroImages[currentImageIndex]})`}}>
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
        
        {/* Image controls */}
        <div className="hero-controls">
          <div className="hero-indicators">
            {heroImages.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
                onClick={() => setCurrentImageIndex(index)}
                aria-label={`Switch to image ${index + 1}`}
              />
            ))}
          </div>
          
          <button 
            className="pause-button"
            onClick={togglePause}
            aria-label={isPaused ? 'Resume slideshow' : 'Pause slideshow'}
          >
            {isPaused ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
              </svg>
            )}
          </button>
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
