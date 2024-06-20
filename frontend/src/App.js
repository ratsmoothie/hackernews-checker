import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/scrape');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="App">
      <h1>Hacker News Latest Posts</h1>
      <ul>
        {posts.map(post => (
          <li key={post.rank}>
            <strong>{post.rank}. {post.title}</strong> by {post.user} ({post.age})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
