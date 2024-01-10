const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const totalLikes = blogs.reduce((sum, blog) => sum + blog.likes, 0);

  return totalLikes;
};

const favoriteBlog = (blogs) => {
  const maxLikes = Math.max(...blogs.map((blog) => blog.likes));
  const favoriteBlog = blogs.find((blog) => blog.likes === maxLikes);

  return favoriteBlog
    ? {
        author: favoriteBlog.author,
        likes: favoriteBlog.likes,
        title: favoriteBlog.title,
      }
    : null;
};

const mostBlogs = (blogs) => {
  // Step 1: Initialize an object to store the count of blogs for each author
  const blogCounts = {};

  // Step 2: Iterate through the blogs and count the number of blogs for each author
  blogs.forEach((blog) => {
    if (blog.author in blogCounts) {
      blogCounts[blog.author]++;
    } else {
      blogCounts[blog.author] = 1;
    }
  });

  // Step 3: Find the author with the maximum number of blogs
  let topAuthor = null;
  let maxBlogs = 0;

  for (const author in blogCounts) {
    if (blogCounts[author] > maxBlogs) {
      topAuthor = author;
      maxBlogs = blogCounts[author];
    }
  }

  // Step 4: Return the result
  return topAuthor
    ? {
        author: topAuthor,
        blogs: maxBlogs,
      }
    : null;
};

const mostLikes = (blogs) => {
  // Create an object to store the total likes for each author
  const likesByAuthor = {};

  // Iterate through the blogs and accumulate the total likes for each author
  blogs.forEach((blog) => {
    if (blog.author in likesByAuthor) {
      likesByAuthor[blog.author] += blog.likes;
    } else {
      likesByAuthor[blog.author] = blog.likes;
    }
  });

  // Find the author with the maximum total likes
  let topAuthor = null;
  let maxLikes = 0;

  for (const author in likesByAuthor) {
    if (likesByAuthor[author] > maxLikes) {
      topAuthor = author;
      maxLikes = likesByAuthor[author];
    }
  }

  // Return the result
  return topAuthor
    ? {
        author: topAuthor,
        likes: maxLikes,
      }
    : null;
};

module.exports = {
  dummy,
  mostLikes,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
