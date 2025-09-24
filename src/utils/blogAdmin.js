// Blog Admin Utilities
// This file provides helper functions for managing blog posts
// In a production environment, these would connect to a real database

import blogService from '../services/blogService';

class BlogAdmin {
  // Create a new blog post
  static createPost({
    title,
    excerpt,
    content,
    category,
    author = "Neyaz Ahmad",
    tags = [],
    readTime = "5 min read"
  }) {
    const newPost = {
      title,
      excerpt,
      content,
      category,
      author,
      tags,
      readTime,
      date: new Date().toISOString().split('T')[0]
    };

    return blogService.addPost(newPost);
  }

  // Update an existing post
  static updatePost(id, updates) {
    return blogService.updatePost(id, updates);
  }

  // Delete a post
  static deletePost(id) {
    return blogService.deletePost(id);
  }

  // Get post statistics
  static getStats() {
    const allPosts = blogService.getAllPosts();
    const categories = blogService.getCategories();
    
    return {
      totalPosts: allPosts.length,
      categories: categories.length - 1, // Exclude "All" category
      averageReadTime: this.calculateAverageReadTime(allPosts),
      postsByCategory: this.getPostCountByCategory(allPosts),
      recentPosts: blogService.getRecentPosts(5)
    };
  }

  // Helper: Calculate average read time
  static calculateAverageReadTime(posts) {
    const totalMinutes = posts.reduce((sum, post) => {
      const minutes = parseInt(post.readTime.match(/\d+/)[0]);
      return sum + minutes;
    }, 0);
    
    return Math.round(totalMinutes / posts.length);
  }

  // Helper: Get post count by category
  static getPostCountByCategory(posts) {
    const counts = {};
    posts.forEach(post => {
      counts[post.category] = (counts[post.category] || 0) + 1;
    });
    return counts;
  }

  // Export blog data as JSON (for backup)
  static exportData() {
    const data = {
      posts: blogService.getAllPosts(),
      categories: blogService.getCategories(),
      exportDate: new Date().toISOString(),
      totalPosts: blogService.getAllPosts().length
    };

    return JSON.stringify(data, null, 2);
  }

  // Generate a blog post template
  static generateTemplate(title, category = "Technology") {
    return {
      title: title,
      excerpt: "Add a compelling excerpt here...",
      content: `
        <p>Introduction paragraph goes here...</p>
        
        <h2>Main Section</h2>
        <p>Content for the main section...</p>
        
        <h2>Another Section</h2>
        <p>More content here...</p>
        
        <h2>Conclusion</h2>
        <p>Wrap up your thoughts...</p>
      `.trim(),
      category: category,
      author: "Neyaz Ahmad",
      tags: [],
      readTime: "5 min read"
    };
  }
}

export default BlogAdmin;

// Example usage (for development/testing):
// 
// // Create a new post
// const newPost = BlogAdmin.createPost({
//   title: "My New Blog Post",
//   excerpt: "This is an exciting new post about...",
//   content: "<p>Full HTML content here...</p>",
//   category: "Technology",
//   tags: ["react", "javascript", "web development"]
// });
//
// // Get statistics
// const stats = BlogAdmin.getStats();
// console.log(stats);
//
// // Export all data
// const backup = BlogAdmin.exportData();
// console.log(backup);
