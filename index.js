const { chromium } = require("playwright");
const Post = require("./post");
const PostRanking = require("./postRanking");

async function saveHackerNewsArticles() {
  // Launch browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Go to Hacker News newest page
  await page.goto("https://news.ycombinator.com/newest");

  let posts = [];
  let rank = 0; // Initialize rank counter

  // Function to extract posts from current page
  const extractPostsFromPage = async () => {
    return await page.$$eval('.athing', items => {
      return items.map((item, index) => {
        const rankOnPage = index + 1; // Rank on the current page
        const title = item.querySelector('.titleline > a').innerText;
        const userElement = item.nextElementSibling.querySelector('.hnuser');
        const ageElement = item.nextElementSibling.querySelector('.age > a');
        const user = userElement ? userElement.innerText : 'unknown';
        const age = ageElement ? ageElement.innerText : 'unknown';
        return { rankOnPage, title, user, age };
      });
    });
  };

  let continueScraping = true;

  while (continueScraping && posts.length < 100) {
    // Extract posts from current page
    const newPosts = await extractPostsFromPage();
    posts.push(...newPosts.slice(0, 100 - posts.length).map(post => ({
      rank: ++rank, // Increment overall rank counter
      title: post.title,
      user: post.user,
      age: post.age
    })));

    // Click "More" button to load next page
    const moreButton = await page.$('.morelink');
    if (moreButton && posts.length < 100) {
      await moreButton.click();
      // Wait for new posts to load
      await page.waitForSelector('.athing');
    } else {
      continueScraping = false;
    }
  }

  // Convert age to Unix timestamp (time submitted)
  const convertAgeToTimestamp = (age) => {
    const [value, unit] = age.split(' ');
    const now = Math.floor(Date.now() / 1000);
    if (unit.includes('minute')) return now - parseInt(value) * 60;
    if (unit.includes('hour')) return now - parseInt(value) * 3600;
    if (unit.includes('day')) return now - parseInt(value) * 86400;
    if (unit.includes('second')) return now;
    return now; // Default to now if the unit is not recognized
  };

  // Create Post objects
  const postObjects = posts.map(article => new Post(
    article.rank,
    article.title,
    convertAgeToTimestamp(article.age),
    article.user,
    article.age
  ));

  // Create PostRanking object
  const postRanking = new PostRanking(postObjects);

  // Output sorted posts by time
  console.log('First 100 posts, sorted by time:');
  postRanking.sortByTime().forEach(post => {
    console.log(`Rank: ${post.rank}, Title: ${post.title}, User: ${post.user}, Age: ${post.age}, UTC Time: ${post.getUTCTime()}`);
  });

  console.log('\n');

  // Test: Check if posts are sorted from newest to oldest
  const sortedByTime = postRanking.sortByTime();
  let isSorted = true;
  for (let i = 0; i < sortedByTime.length - 1; i++) {
    if (sortedByTime[i].timeSubmitted < sortedByTime[i + 1].timeSubmitted) {
      isSorted = false;
      break;
    }
  }
  console.log('Posts are sorted from newest to oldest:', isSorted);
  console.log('\n');

  // Output stats
  console.log('Bonus stats for nerds: ');
  console.log('Posts per minute:', postRanking.getPostsPerMinute());

}

(async () => {
  await saveHackerNewsArticles();
})();
