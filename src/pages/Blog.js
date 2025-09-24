import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import blogService from '../services/blogService';
import './Blog.css';

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load blog data when component mounts
    const loadBlogData = () => {
      try {
        const posts = blogService.getAllPosts();
        const cats = blogService.getCategories();
        
        setBlogPosts(posts);
        setCategories(cats.map(cat => cat.name));
        setLoading(false);
      } catch (error) {
        console.error('Error loading blog data:', error);
        setLoading(false);
      }
    };

    loadBlogData();
  }, []);

  const filteredPosts = selectedCategory === "All" 
    ? blogPosts 
    : blogService.getPostsByCategory(selectedCategory);

  if (loading) {
    return (
      <div className="blog">
        <div className="container">
          <div className="blog-header">
            <h1>My Blog</h1>
            <p className="blog-intro">Loading posts...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="blog">
      <div className="container">
        <div className="blog-header">
          <h1>My Blog</h1>
          <p className="blog-intro">
            Welcome to my personal blog where I share my thoughts, experiences, 
            and insights on technology, family, and life.
          </p>
        </div>

        <div className="blog-filters">
          <h3>Categories</h3>
          <div className="category-buttons">
            {categories.map(category => (
              <button
                key={category}
                className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="blog-posts">
          {filteredPosts.map(post => (
            <article key={post.id} className="blog-post-card">
              <div className="post-meta">
                <span className="post-category">{post.category}</span>
                <span className="post-date">{new Date(post.date).toLocaleDateString()}</span>
                <span className="post-read-time">{post.readTime}</span>
              </div>
              <h2 className="post-title">
                <Link to={`/blog/${post.id}`}>{post.title}</Link>
              </h2>
              <p className="post-excerpt">{post.excerpt}</p>
              <Link to={`/blog/${post.id}`} className="read-more">
                Read More →
              </Link>
            </article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="no-posts">
            <p>No posts found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
