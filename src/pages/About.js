import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about">
      <div className="container">
        <div className="about-header">
          <h1>About Me</h1>
          <p className="about-intro">
            Welcome! I'm passionate about technology, family, and sharing experiences through writing.
          </p>
        </div>

        <div className="about-content">
          <div className="about-section">
            <h2>My Story</h2>
            <p>
              Hello! I'm a passionate individual who believes in the power of technology to make a difference. 
              My journey has taken me through various experiences that have shaped who I am today.
            </p>
            <p>
              When I'm not working on exciting projects, you'll find me spending quality time with my family, 
              exploring new technologies, or writing about my experiences and insights.
            </p>
          </div>

          <div className="about-section">
            <h2>What I Do</h2>
            <div className="skills-grid">
              <div className="skill-item">
                <h3>Technology</h3>
                <p>Passionate about web development, software engineering, and emerging technologies.</p>
              </div>
              <div className="skill-item">
                <h3>Writing</h3>
                <p>I enjoy sharing my thoughts and experiences through blog posts and articles.</p>
              </div>
              <div className="skill-item">
                <h3>Family Time</h3>
                <p>Cherishing moments with loved ones and creating lasting memories together.</p>
              </div>
            </div>
          </div>

          <div className="about-section">
            <h2>Get In Touch</h2>
            <p>
              I'd love to connect with you! Whether you want to discuss technology, share experiences, 
              or just say hello, feel free to reach out.
            </p>
            <div className="contact-info">
              <p>📧 Email: your.email@example.com</p>
              <p>💼 LinkedIn: Your LinkedIn Profile</p>
              <p>🐦 Twitter: @yourusername</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
