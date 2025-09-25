import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import blogService from '../../services/blogService';
import './Blog.css';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlogData = async () => {
      try {
        setLoading(true);
        console.log('Loading blog data from API...');
        
        const allPosts = await blogService.getAllPosts();
        const allCategories = await blogService.getCategories();
        
        console.log('Posts loaded:', allPosts?.length || 0);
        console.log('Categories loaded:', allCategories);
        
        if (!allPosts || !Array.isArray(allPosts)) {
          throw new Error('Invalid posts data from API');
        }
        
        setPosts(allPosts);
        setFilteredPosts(allPosts);
        setCategories(['All', ...allCategories]);
        setLoading(false);
      } catch (error) {
        console.error('Error loading blog data:', error);
        setPosts([]);
        setFilteredPosts([]);
        setCategories(['All']);
        setLoading(false);
      }
    };

    loadBlogData();
  }, []);

  useEffect(() => {
    const filterPosts = async () => {
      try {
        let filtered = posts;

        // Filter by search term first
        if (searchTerm) {
          filtered = await blogService.searchPosts(searchTerm);
        } else if (selectedCategory !== 'All') {
          // Only filter by category if no search term
          filtered = await blogService.getPostsByCategory(selectedCategory);
        }

        setFilteredPosts(filtered);
      } catch (error) {
        console.error('Error filtering posts:', error);
        setFilteredPosts(posts); // Fallback to showing all posts
      }
    };

    if (posts.length > 0) {
      filterPosts();
    }
  }, [selectedCategory, searchTerm, posts]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSearchTerm(''); // Clear search when changing category
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setSelectedCategory('All'); // Reset category when searching
  };

  if (loading) {
    return (
      <div className="blog">
        <div className="container">
          <div className="loading">Loading blog posts...</div>
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
            Welcome to my blog! Here I share my thoughts, experiences, and insights on various topics.
          </p>
        </div>

        <div className="blog-filters">
          <div className="search-section">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
            />
          </div>
          
          <div className="category-filters">
            <h3>Categories</h3>
            <div className="category-buttons">
              {categories.map(category => (
                <button
                  key={category}
                  className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => handleCategoryChange(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="blog-content">
          {filteredPosts.length === 0 ? (
            <div className="no-posts">
              <h3>No posts found</h3>
              <p>
                {searchTerm 
                  ? `No posts match your search for "${searchTerm}"`
                  : `No posts found in the "${selectedCategory}" category`
                }
              </p>
            </div>
          ) : (
            <div className="blog-posts">
              {filteredPosts.map(post => (
                <article key={post.id} className="blog-post-card">
                  <div className="post-header">
                    <div className="post-meta">
                      <span className="post-category">{post.category}</span>
                      <span className="post-date">
                        {blogService.formatPostDate(post)}
                      </span>
                      <span className="post-read-time">{post.readTime}</span>
                    </div>
                    <h2 className="post-title">
                      <Link to={`/blog/${post.id}`}>{post.title}</Link>
                    </h2>
                    {post.author && (
                      <p className="post-author">By {post.author}</p>
                    )}
                  </div>
                  
                  <div className="post-excerpt">
                    <p>{post.excerpt}</p>
                  </div>
                  
                  <div className="post-preview">
                    <p>{blogService.getContentPreview(post, 150)}</p>
                  </div>
                  
                  {post.tags && post.tags.length > 0 && (
                    <div className="post-tags">
                      {post.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <div className="post-footer">
                    <Link to={`/blog/${post.id}`} className="read-more">
                      Read More →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;
