const fs = require('fs');
const path = require('path');
const { calculateReadingTime } = require('markdown-reading-time');

const BLOG_DATA_PATH = path.join(__dirname, '../src/assets/data/blog.json');
const ARTICLE_ROOT = path.join(__dirname, '../content/article');

function slugify(title) {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function getArticlePath(blog) {
  return path.join(ARTICLE_ROOT, `${slugify(blog.title)}.md`);
}

function updateReadingTime() {
  const blogs = JSON.parse(fs.readFileSync(BLOG_DATA_PATH, 'utf-8'));

  const updatedBlogs = blogs.map((blog) => {
    const articlePath = getArticlePath(blog);

    if (!fs.existsSync(articlePath)) {
      console.warn(`Skipped ${blog.title}: missing ${path.relative(process.cwd(), articlePath)}`);
      return blog;
    }

    const markdown = fs.readFileSync(articlePath, 'utf-8');
    const readingTime = calculateReadingTime(markdown).minutes;

    console.log(`${blog.title}: ${readingTime} min`);

    return {
      ...blog,
      readingTime,
    };
  });

  fs.writeFileSync(BLOG_DATA_PATH, `${JSON.stringify(updatedBlogs, null, 2)}\n`);
  console.log('Reading time updated at src/assets/data/blog.json');
}

updateReadingTime();
