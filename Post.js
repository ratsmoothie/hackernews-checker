// post.js

class Post {
    constructor(rank, title, timeSubmitted, user, age) {
      this.rank = rank;
      this.title = title;
      this.timeSubmitted = timeSubmitted; // This should be in a standard format like Unix timestamp
      this.user = user;
      this.age = age; // This is the age string like '5 minutes ago'
    }
    
    //conversion to get UTC time
    getUTCTime() {
      return new Date(this.timeSubmitted * 1000).toISOString();
    }
  }
  
  module.exports = Post;
  