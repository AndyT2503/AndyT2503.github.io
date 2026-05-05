const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://tuhoangdev.netlify.app';
const SITEMAP_PATH = path.join(__dirname, '../src/sitemap.xml');
const DATA_PATH = path.join(__dirname, '../src/assets/data/blog.json');

// ===== Utils =====
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

function withSlash(url) {
  return url.endsWith('/') ? url : url + '/';
}

const MONTHS = {
  January: 0,
  February: 1,
  March: 2,
  April: 3,
  May: 4,
  June: 5,
  July: 6,
  August: 7,
  September: 8,
  October: 9,
  November: 10,
  December: 11
};

function parseBlogDate(dateStr) {
  const [day, month, year] = dateStr.split(' ');

  return new Date(Date.UTC(Number(year), MONTHS[month], Number(day)));
}

function formatDate(dateStr) {
  return parseBlogDate(dateStr).toISOString().split('T')[0];
}

function getLatestDate(items) {
  return items
    .map(item => parseBlogDate(item.date))
    .sort((a, b) => b.getTime() - a.getTime())[0];
}

// ===== Load =====
const blogs = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
const latestBlogDate = getLatestDate(blogs);

// ===== Build URLs =====
const urls = [];

// homepage
urls.push({
  loc: withSlash(DOMAIN),
  lastmod: latestBlogDate.toISOString().split('T')[0],
  priority: '1.0'
});

// blogs
blogs.forEach(blog => {
  const slug = slugify(blog.title);

  urls.push({
    loc: withSlash(`${DOMAIN}/blog/${slug}`),
    lastmod: formatDate(blog.date),
    priority: '0.8'
  });
});

// ===== Generate sitemap =====
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

${urls.map(u => `
  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${u.priority}</priority>
  </url>
`).join('')}

</urlset>`;

fs.writeFileSync(SITEMAP_PATH, sitemap);

console.log('Sitemap generated at src/sitemap.xml');
