import blogData from '../data/blogPosts.json';

class BlogService {
  constructor() {
    this.posts = blogData.posts;
    this.categories = blogData.categories;
  }

  // Get all blog posts
  getAllPosts() {
    return this.posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  // Get a single post by ID
  getPostById(id) {
    return this.posts.find(post => post.id === parseInt(id));
  }

  // Get posts by category
  getPostsByCategory(category) {
    if (category === 'All') {
      return this.getAllPosts();
    }
    return this.posts
      .filter(post => post.category === category)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  // Get all categories
  getCategories() {
    return this.categories;
  }

  // Get posts by tag
  getPostsByTag(tag) {
    return this.posts
      .filter(post => post.tags && post.tags.includes(tag))
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  // Search posts by title or content
  searchPosts(query) {
    const searchTerm = query.toLowerCase();
    return this.posts
      .filter(post => 
        post.title.toLowerCase().includes(searchTerm) ||
        post.excerpt.toLowerCase().includes(searchTerm) ||
        post.content.toLowerCase().includes(searchTerm) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      )
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  // Get recent posts (limit)
  getRecentPosts(limit = 3) {
    return this.getAllPosts().slice(0, limit);
  }

  // Get related posts (by category, excluding current post)
  getRelatedPosts(postId, limit = 3) {
    const currentPost = this.getPostById(postId);
    if (!currentPost) return [];

    return this.posts
      .filter(post => 
        post.id !== postId && 
        post.category === currentPost.category
      )
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, limit);
  }

  // Add a new post (for future use with admin panel)
  addPost(post) {
    const newPost = {
      ...post,
      id: Math.max(...this.posts.map(p => p.id)) + 1,
      date: new Date().toISOString().split('T')[0]
    };
    this.posts.unshift(newPost);
    return newPost;
  }

  // Update a post (for future use with admin panel)
  updatePost(id, updatedPost) {
    const index = this.posts.findIndex(post => post.id === parseInt(id));
    if (index !== -1) {
      this.posts[index] = { ...this.posts[index], ...updatedPost };
      return this.posts[index];
    }
    return null;
  }

  // Delete a post (for future use with admin panel)
  deletePost(id) {
    const index = this.posts.findIndex(post => post.id === parseInt(id));
    if (index !== -1) {
      return this.posts.splice(index, 1)[0];
    }
    return null;
  }
}

// Create a singleton instance
const blogService = new BlogService();

export default blogService;
