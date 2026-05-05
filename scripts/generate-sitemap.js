const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://tuhoangdev.netlify.app';
const DIST_PATH = path.join(__dirname, '../docs');
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

function formatDate(dateStr) {
  return new Date(dateStr).toISOString();
}

// ===== Load =====
const blogs = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));

// ===== Build URLs =====
const urls = [];

// homepage
urls.push({
  loc: withSlash(DOMAIN),
  lastmod: new Date().toISOString(),
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

fs.writeFileSync(path.join(DIST_PATH, 'sitemap.xml'), sitemap);

console.log('🗺️ Sitemap generated');
