class BlogService {
  constructor() {
    this.baseUrl = 'https://localhost:5001/api/BlogPosts';
    this.posts = [];
    this.categories = [];
    this.isLoaded = false;
  }

  // Get the appropriate date from post object (createdAt or updatedAt)
  getPostDate(post, preferUpdated = false) {
    // If preferUpdated is true, try updatedAt first, otherwise try createdAt first
    const primaryDate = preferUpdated ? post.updatedAt : post.createdAt;
    const fallbackDate = preferUpdated ? post.createdAt : post.updatedAt;
    
    // Return the primary date if it exists, otherwise fallback, otherwise try old 'date' field
    return primaryDate || fallbackDate || post.date;
  }

  // Utility function to format dates safely
  formatDate(dateString) {
    if (!dateString) return 'No date';
    
    try {
      // Handle different date formats
      let date;
      
      // If it's already a Date object
      if (dateString instanceof Date) {
        date = dateString;
      }
      // If it's a string, try to parse it
      else if (typeof dateString === 'string') {
        // Handle ISO date strings with microseconds (2025-09-24T04:44:46.7013026Z)
        if (dateString.includes('T')) {
          date = new Date(dateString);
        }
        // Handle simple date strings (2024-01-15)
        else if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
          date = new Date(dateString + 'T00:00:00.000Z');
        }
        // Handle other formats
        else {
          date = new Date(dateString);
        }
      }
      // If it's a number (timestamp)
      else if (typeof dateString === 'number') {
        date = new Date(dateString);
      }
      else {
        throw new Error('Invalid date format');
      }

      // Check if date is valid
      if (isNaN(date.getTime())) {
        throw new Error('Invalid date');
      }

      return date.toLocaleDateString();
    } catch (error) {
      console.warn('Error formatting date:', dateString, error);
      return 'Invalid date';
    }
  }

  // Format post date using createdAt/updatedAt
  formatPostDate(post, preferUpdated = false) {
    const dateString = this.getPostDate(post, preferUpdated);
    return this.formatDate(dateString);
  }

  // Extract clean text preview from HTML content
  getContentPreview(post, maxLength = 200) {
    if (!post.content) return '';
    
    try {
      // Remove HTML tags and get plain text
      const cleanText = post.content
        .replace(/<[^>]*>/g, ' ') // Remove HTML tags
        .replace(/&nbsp;/g, ' ') // Replace &nbsp; with spaces
        .replace(/&amp;/g, '&') // Replace &amp; with &
        .replace(/&lt;/g, '<') // Replace &lt; with <
        .replace(/&gt;/g, '>') // Replace &gt; with >
        .replace(/&quot;/g, '"') // Replace &quot; with "
        .replace(/\s+/g, ' ') // Replace multiple spaces with single space
        .trim();

      // Truncate to maxLength and add ellipsis if needed
      if (cleanText.length <= maxLength) {
        return cleanText;
      }

      // Find the last complete word within maxLength
      const truncated = cleanText.substring(0, maxLength);
      const lastSpaceIndex = truncated.lastIndexOf(' ');
      
      if (lastSpaceIndex > maxLength * 0.8) {
        return truncated.substring(0, lastSpaceIndex) + '...';
      }
      
      return truncated + '...';
    } catch (error) {
      console.warn('Error extracting content preview:', error);
      return post.excerpt || '';
    }
  }

  // Fetch all blog posts from API
  async fetchPosts() {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Assuming API returns an array of posts or an object with posts property
      this.posts = Array.isArray(data) ? data : data.posts || [];
      
      // Extract unique categories from posts
      this.categories = [...new Set(this.posts.map(post => post.category))].filter(Boolean);
      
      this.isLoaded = true;
      return this.posts;
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      throw error;
    }
  }

  // Get all blog posts (async)
  async getAllPosts() {
    if (!this.isLoaded) {
      await this.fetchPosts();
    }
    return this.posts.sort((a, b) => {
      const dateA = this.getPostDate(a);
      const dateB = this.getPostDate(b);
      return new Date(dateB) - new Date(dateA);
    });
  }

  // Get a single post by ID (async)
  async getPostById(id) {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Error fetching post ${id}:`, error);
      
      // Fallback to local cache if API fails
      if (!this.isLoaded) {
        await this.fetchPosts();
      }
      return this.posts.find(post => post.id === parseInt(id)) || null;
    }
  }

  // Get posts by category (async)
  async getPostsByCategory(category) {
    if (!this.isLoaded) {
      await this.fetchPosts();
    }
    
    if (category === 'All') {
      return this.getAllPosts();
    }
    
    return this.posts
      .filter(post => post.category === category)
      .sort((a, b) => {
        const dateA = this.getPostDate(a);
        const dateB = this.getPostDate(b);
        return new Date(dateB) - new Date(dateA);
      });
  }

  // Get all categories (async)
  async getCategories() {
    if (!this.isLoaded) {
      await this.fetchPosts();
    }
    return this.categories;
  }

  // Get posts by tag (async)
  async getPostsByTag(tag) {
    if (!this.isLoaded) {
      await this.fetchPosts();
    }
    
    return this.posts
      .filter(post => post.tags && post.tags.includes(tag))
      .sort((a, b) => {
        const dateA = this.getPostDate(a);
        const dateB = this.getPostDate(b);
        return new Date(dateB) - new Date(dateA);
      });
  }

  // Search posts by title or content (async)
  async searchPosts(query) {
    if (!this.isLoaded) {
      await this.fetchPosts();
    }
    
    const searchTerm = query.toLowerCase();
    return this.posts
      .filter(post => 
        post.title?.toLowerCase().includes(searchTerm) ||
        post.excerpt?.toLowerCase().includes(searchTerm) ||
        post.content?.toLowerCase().includes(searchTerm) ||
        (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
      )
      .sort((a, b) => {
        const dateA = this.getPostDate(a);
        const dateB = this.getPostDate(b);
        return new Date(dateB) - new Date(dateA);
      });
  }

  // Get recent posts (async)
  async getRecentPosts(limit = 3) {
    const allPosts = await this.getAllPosts();
    return allPosts.slice(0, limit);
  }

  // Get related posts (async)
  async getRelatedPosts(postId, limit = 3) {
    if (!this.isLoaded) {
      await this.fetchPosts();
    }
    
    const currentPost = this.posts.find(post => post.id === parseInt(postId));
    if (!currentPost) return [];

    return this.posts
      .filter(post => 
        post.id !== parseInt(postId) && 
        post.category === currentPost.category
      )
      .sort((a, b) => {
        const dateA = this.getPostDate(a);
        const dateB = this.getPostDate(b);
        return new Date(dateB) - new Date(dateA);
      })
      .slice(0, limit);
  }

  // Add a new post (for future use with admin panel)
  async addPost(post) {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(post)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newPost = await response.json();
      
      // Update local cache
      this.posts.unshift(newPost);
      
      return newPost;
    } catch (error) {
      console.error('Error adding post:', error);
      throw error;
    }
  }

  // Update a post (for future use with admin panel)
  async updatePost(id, updatedPost) {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(updatedPost)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updated = await response.json();
      
      // Update local cache
      const index = this.posts.findIndex(post => post.id === parseInt(id));
      if (index !== -1) {
        this.posts[index] = updated;
      }
      
      return updated;
    } catch (error) {
      console.error('Error updating post:', error);
      throw error;
    }
  }

  // Delete a post (for future use with admin panel)
  async deletePost(id) {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Update local cache
      const index = this.posts.findIndex(post => post.id === parseInt(id));
      if (index !== -1) {
        return this.posts.splice(index, 1)[0];
      }
      
      return null;
    } catch (error) {
      console.error('Error deleting post:', error);
      throw error;
    }
  }

  // Clear cache (useful for refreshing data)
  clearCache() {
    this.posts = [];
    this.categories = [];
    this.isLoaded = false;
  }

  // Refresh data from API
  async refresh() {
    this.clearCache();
    return await this.fetchPosts();
  }
}

// Create a singleton instance
const blogService = new BlogService();

export default blogService;
