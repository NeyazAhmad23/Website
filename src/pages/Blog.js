import React from 'react';
import { Link } from 'react-router-dom';
import './Blog.css';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "My Journey into Web Development",
      excerpt: "How I discovered my passion for creating digital experiences and the technologies that shaped my path.",
      date: "2024-01-15",
      readTime: "5 min read",
      category: "Technology"
    },
    {
      id: 2,
      title: "Family Adventures: Our Summer Vacation",
      excerpt: "Sharing the wonderful memories we created during our family trip and the lessons learned along the way.",
      date: "2024-01-10",
      readTime: "3 min read",
      category: "Family"
    },
    {
      id: 3,
      title: "Reflections on Work-Life Balance",
      excerpt: "Thoughts on maintaining harmony between professional goals and personal relationships.",
      date: "2024-01-05",
      readTime: "4 min read",
      category: "Life"
    },
    {
      id: 4,
      title: "Building This Personal Website",
      excerpt: "The technical decisions and design choices that went into creating this personal space on the web.",
      date: "2024-01-01",
      readTime: "6 min read",
      category: "Technology"
    }
  ];

  const categories = ["All", "Technology", "Family", "Life"];
  const [selectedCategory, setSelectedCategory] = React.useState("All");

  const filteredPosts = selectedCategory === "All" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

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
