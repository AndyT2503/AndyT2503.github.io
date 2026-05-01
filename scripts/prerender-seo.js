const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://andyt2503.github.io';
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

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toISOString();
}

// 🔥 đảm bảo URL luôn có trailing slash
function withSlash(url) {
  return url.endsWith('/') ? url : url + '/';
}

// ===== Load data =====
const blogs = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));

// load template index.html (Angular build output)
const template = fs.readFileSync(path.join(DIST_PATH, 'index.html'), 'utf-8');

// ===== SEO injector (Blog) =====
function injectSEO(html, seo) {
  const { title, description, url, image, date } = seo;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": description,
    "image": image,
    "url": url,
    "datePublished": date,
    "author": {
      "@type": "Person",
      "name": "Tu Hoang"
    }
  };

  const seoTags = `
<title>${title}</title>
<meta name="description" content="${description}" />
<link rel="canonical" href="${url}" />

<meta property="og:type" content="article" />
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${description}" />
<meta property="og:image" content="${image}" />
<meta property="og:url" content="${url}" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${title}" />
<meta name="twitter:description" content="${description}" />
<meta name="twitter:image" content="${image}" />

<script type="application/ld+json">
${JSON.stringify(jsonLd)}
</script>
`;

  // remove old title + description
  html = html.replace(/<title>.*<\/title>/, '');
  html = html.replace(/<meta name="description".*?>/, '');

  return html.replace('</head>', `${seoTags}</head>`);
}

// ===== SEO injector (Homepage) =====
function injectHomeSEO(html) {
  const seoTags = `
<title>Tu Hoang - Portfolio</title>

<meta name="description" content="Welcome to the personal website of Tu Hoang, a passionate software engineer specializing in Angular and .NET Core. Explore Tu's portfolio and achievements." />
<meta name="keywords" content="Tu Hoang, AndyT, AndyT2503 software engineer, web developer, Angular, .NET Core, portfolio" />
<meta name="author" content="Tu Hoang - Portfolio" />

<link rel="canonical" href="${DOMAIN}/" />

<meta property="og:type" content="website" />
<meta property="og:url" content="${DOMAIN}/" />
<meta property="og:title" content="Tu Hoang - Portfolio" />
<meta property="og:description" content="Welcome to the personal website of Tu Hoang, a passionate software engineer specializing in Angular and .NET Core. Explore Tu's portfolio and achievements." />
<meta property="og:image" content="${DOMAIN}/assets/img/avatar.jpg" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:url" content="${DOMAIN}/" />
<meta name="twitter:title" content="Tu Hoang - Portfolio" />
<meta name="twitter:description" content="Welcome to the personal website of Tu Hoang, a passionate software engineer specializing in Angular and .NET Core. Explore Tu's portfolio and achievements." />
<meta name="twitter:image" content="${DOMAIN}/assets/img/avatar.jpg" />

<script type="application/ld+json">
${JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Tu Hoang",
  "url": DOMAIN,
  "image": `${DOMAIN}/assets/img/avatar.jpg`,
  "jobTitle": "Software Engineer"
})}
</script>
`;

  html = html.replace(/<title>.*<\/title>/, '');
  html = html.replace(/<meta name="description".*?>/, '');

  return html.replace('</head>', `${seoTags}</head>`);
}

// ===== Inject homepage SEO =====
const homeHtml = injectHomeSEO(template);
fs.writeFileSync(path.join(DIST_PATH, 'index.html'), homeHtml);
console.log('✅ Homepage SEO injected');

// ===== Generate blog pages =====
const urls = [withSlash(`${DOMAIN}/`)];

blogs.forEach(blog => {
  const slug = slugify(blog.title);

  // 🔥 FIX: luôn có trailing slash
  const url = withSlash(`${DOMAIN}/blog/${slug}`);
  const image = `${DOMAIN}/content/images/${slug}/default.jpg`;

  const finalHtml = injectSEO(template, {
    title: blog.title,
    description: blog.description,
    url,
    image,
    date: formatDate(blog.date)
  });

  const outputDir = path.join(DIST_PATH, 'blog', slug);
  fs.mkdirSync(outputDir, { recursive: true });

  fs.writeFileSync(path.join(outputDir, 'index.html'), finalHtml);

  urls.push(url);
});

console.log('✅ Blog pages generated');

// ===== Generate sitemap.xml =====
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
                      http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">

${urls.map(url => `
  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${url === 'https://andyt2503.github.io/' ? '1.0' : '0.8'}</priority>
  </url>
`).join('')}

</urlset>`;

fs.writeFileSync(path.join(DIST_PATH, 'sitemap.xml'), sitemap);
console.log('✅ sitemap.xml generated');

// ===== Copy index.html -> 404.html =====
fs.copyFileSync(
  path.join(DIST_PATH, 'index.html'),
  path.join(DIST_PATH, '404.html')
);

console.log('✅ 404.html generated');

console.log('🎉 DONE PRERENDER SEO');
