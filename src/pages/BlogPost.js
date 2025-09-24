import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import blogService from '../services/blogService';
import './BlogPost.css';

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPost = () => {
      try {
        const foundPost = blogService.getPostById(id);
        const related = blogService.getRelatedPosts(parseInt(id));
        
        setPost(foundPost);
        setRelatedPosts(related);
        setLoading(false);
      } catch (error) {
        console.error('Error loading post:', error);
        setLoading(false);
      }
    };

    loadPost();
  }, [id]);

  if (loading) {
    return (
      <div className="blog-post">
        <div className="container">
          <div className="post-navigation">
            <Link to="/blog" className="back-link">← Back to Blog</Link>
          </div>
          <div className="loading">Loading post...</div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="blog-post">
        <div className="container">
          <div className="post-not-found">
            <h1>Post Not Found</h1>
            <p>The blog post you're looking for doesn't exist.</p>
            <Link to="/blog" className="btn btn-primary">← Back to Blog</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-post">
      <div className="container">
        <div className="post-navigation">
          <Link to="/blog" className="back-link">← Back to Blog</Link>
        </div>
        
        <article className="post-content">
          <header className="post-header">
            <div className="post-meta">
              <span className="post-category">{post.category}</span>
              <span className="post-date">{new Date(post.date).toLocaleDateString()}</span>
              <span className="post-read-time">{post.readTime}</span>
            </div>
            <h1 className="post-title">{post.title}</h1>
            {post.author && (
              <p className="post-author">By {post.author}</p>
            )}
          </header>
          
          <div 
            className="post-body"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          
          {post.tags && post.tags.length > 0 && (
            <div className="post-tags">
              <h4>Tags:</h4>
              <div className="tags-list">
                {post.tags.map((tag, index) => (
                  <span key={index} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>
        
        {relatedPosts.length > 0 && (
          <div className="related-posts">
            <h3>Related Posts</h3>
            <div className="related-posts-grid">
              {relatedPosts.map(relatedPost => (
                <div key={relatedPost.id} className="related-post-card">
                  <h4>
                    <Link to={`/blog/${relatedPost.id}`}>
                      {relatedPost.title}
                    </Link>
                  </h4>
                  <p>{relatedPost.excerpt}</p>
                  <div className="related-post-meta">
                    <span className="related-post-category">{relatedPost.category}</span>
                    <span className="related-post-date">
                      {new Date(relatedPost.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="post-footer">
          <Link to="/blog" className="btn btn-secondary">← Back to All Posts</Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
