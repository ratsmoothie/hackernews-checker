# Kyle's script 

This script gathers the first 100 posts on hackernews and confirms they are sorted from newest (at the top) to oldest (at the bottom).
Further, it outputs all of the relevant information about each post into the console, and also displays how many posts there were per minute.

The bones of a react frontend exist here, it is under construction.

# Dependencies
[Playwright](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright)

[Node.js](https://nodejs.org/en)

# Prerequisites
Make sure playwright is installed. You can install it using npm:
```npm install playwright```
Also, you must install other required npm packages in your project directory:
```npm install```

# Running the script
After cloning the repository, navigate to the directory on your machine and run:
```node index.js```

# Additional notes
* Playwright Setup:
    * If you encounter any issues with Playwright, ensure that the required browsers are installed by running
```npx playwright install```