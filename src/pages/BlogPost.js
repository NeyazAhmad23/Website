import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './BlogPost.css';

const BlogPost = () => {
  const { id } = useParams();

  // Sample blog posts data (in a real app, this would come from an API or database)
  const blogPosts = {
    1: {
      id: 1,
      title: "My Journey into Web Development",
      date: "2024-01-15",
      readTime: "5 min read",
      category: "Technology",
      content: `
        <p>Web development has been an incredible journey for me. It all started with a simple curiosity about how websites work, and it has evolved into a passion that drives my daily work and personal projects.</p>
        
        <h2>The Beginning</h2>
        <p>My first encounter with code was in college when I had to create a simple HTML page for a class project. I remember the excitement I felt when I saw my first "Hello World" appear in the browser. That moment sparked something in me that I couldn't ignore.</p>
        
        <h2>Learning the Fundamentals</h2>
        <p>I started with HTML and CSS, spending countless hours learning about semantic markup, responsive design, and modern CSS techniques. The ability to create beautiful, functional interfaces from nothing but code was mesmerizing.</p>
        
        <p>Then came JavaScript, which opened up a whole new world of interactivity and dynamic content. Learning about DOM manipulation, event handling, and asynchronous programming was challenging but incredibly rewarding.</p>
        
        <h2>Discovering React</h2>
        <p>When I discovered React, everything changed. The component-based architecture and the way it handles state management made building complex applications feel manageable and enjoyable. This website you're reading is actually built with React!</p>
        
        <h2>The Journey Continues</h2>
        <p>Web development is a field that never stops evolving, and that's what I love most about it. There's always something new to learn, whether it's a new framework, a better way to solve a problem, or emerging web standards.</p>
        
        <p>I'm excited to continue this journey and see where it takes me next. If you're thinking about getting into web development, my advice is simple: start building things. The best way to learn is by doing.</p>
      `
    },
    2: {
      id: 2,
      title: "Family Adventures: Our Summer Vacation",
      date: "2024-01-10",
      readTime: "3 min read",
      category: "Family",
      content: `
        <p>This summer, our family embarked on an adventure that we'll remember for years to come. We decided to take a road trip across the country, and it turned out to be one of the best decisions we've ever made.</p>
        
        <h2>Planning the Adventure</h2>
        <p>The planning phase was almost as exciting as the trip itself. We spent weeks researching destinations, mapping out routes, and making lists of must-see attractions. Everyone in the family got to contribute their ideas and preferences.</p>
        
        <h2>Memorable Moments</h2>
        <p>From watching the sunrise over the Grand Canyon to having impromptu dance parties in our hotel rooms, every day brought new memories. The kids were amazing travelers, and their sense of wonder reminded us to appreciate the beauty around us.</p>
        
        <p>One of my favorite moments was when we got caught in a thunderstorm and had to take shelter in a small diner. What could have been a frustrating delay turned into one of the most fun afternoons of the trip, playing board games and sharing stories with the locals.</p>
        
        <h2>Lessons Learned</h2>
        <p>This trip taught us that the best adventures aren't always the ones you plan perfectly. Sometimes the unexpected detours and spontaneous decisions lead to the most meaningful experiences.</p>
        
        <p>We're already planning our next family adventure, and I can't wait to see what memories we'll create next time.</p>
      `
    },
    3: {
      id: 3,
      title: "Reflections on Work-Life Balance",
      date: "2024-01-05",
      readTime: "4 min read",
      category: "Life",
      content: `
        <p>Work-life balance is something I've been thinking about a lot lately. As someone who's passionate about their work, it can be challenging to know when to step away and focus on other aspects of life.</p>
        
        <h2>The Challenge</h2>
        <p>When you love what you do, the line between work and personal time can become blurred. I've found myself working late into the evening, thinking about projects during family time, and checking emails on weekends.</p>
        
        <h2>Finding Boundaries</h2>
        <p>Over the past year, I've been more intentional about setting boundaries. This means having dedicated work hours, creating phone-free zones during family meals, and actually taking my vacation days.</p>
        
        <p>One strategy that's worked well for me is having a shutdown ritual at the end of each workday. I review what I accomplished, plan for tomorrow, and then consciously transition into personal time.</p>
        
        <h2>The Benefits</h2>
        <p>Since implementing these changes, I've noticed improvements in both my work performance and my relationships. When I'm fully present with my family, our time together is more meaningful. When I'm at work, I'm more focused and productive.</p>
        
        <p>Balance isn't about perfect equality between work and life—it's about being intentional with your time and energy. Some days work needs more attention, and other days family and personal time take priority. The key is being conscious about these choices.</p>
      `
    },
    4: {
      id: 4,
      title: "Building This Personal Website",
      date: "2024-01-01",
      readTime: "6 min read",
      category: "Technology",
      content: `
        <p>Creating this personal website has been a fun project that combines my love for web development with my desire to share my thoughts and experiences. Let me walk you through the technical decisions and design choices that went into building it.</p>
        
        <h2>Technology Stack</h2>
        <p>I chose React as the foundation for this site because of its component-based architecture and excellent developer experience. React Router handles the navigation between pages, making it feel like a smooth single-page application.</p>
        
        <p>For styling, I went with vanilla CSS rather than a framework like Bootstrap or Tailwind. This gives me complete control over the design and helps keep the bundle size small.</p>
        
        <h2>Design Philosophy</h2>
        <p>I wanted the design to be clean, readable, and personal. The color scheme is intentionally minimal to keep the focus on the content. The typography choices prioritize readability across different devices and screen sizes.</p>
        
        <h2>Performance Considerations</h2>
        <p>Even though this is a personal site, I wanted to ensure it loads quickly and provides a good user experience. I optimized images, minimized the JavaScript bundle, and implemented lazy loading where appropriate.</p>
        
        <h2>Future Enhancements</h2>
        <p>There are several features I'd like to add in the future:</p>
        <ul>
          <li>A contact form with backend integration</li>
          <li>Comments system for blog posts</li>
          <li>Search functionality for blog content</li>
          <li>Dark mode toggle</li>
          <li>RSS feed for blog posts</li>
        </ul>
        
        <p>Building this website has been a great reminder of why I love web development. There's something satisfying about creating a digital space that's entirely your own.</p>
      `
    }
  };

  const post = blogPosts[parseInt(id)];

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
          </header>
          
          <div 
            className="post-body"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
        
        <div className="post-footer">
          <Link to="/blog" className="btn btn-secondary">← Back to All Posts</Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
