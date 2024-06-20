// postRanking.js

class PostRanking {
    constructor(posts) {
      this.posts = posts;
    }
  
    getPostsPerMinute() {
      const currentTime = Math.floor(Date.now() / 1000); // Current time in Unix timestamp
      const oldestPostTime = Math.min(...this.posts.map(post => post.timeSubmitted));
      const totalTimeMinutes = (currentTime - oldestPostTime) / 60;
      return this.posts.length / totalTimeMinutes;
    }
  
    sortByTime() {
      return this.posts.sort((a, b) => b.timeSubmitted - a.timeSubmitted);
    }
  }
  
  module.exports = PostRanking;
  