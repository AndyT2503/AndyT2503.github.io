const fs = require("fs");
const path = require("path");

const DOMAIN = "https://tuhoangdev.netlify.app";
const DIST_PATH = path.join(__dirname, "../docs");
const DATA_PATH = path.join(__dirname, "../src/assets/data/blog.json");

// ===== AUTHOR =====
const AUTHOR = {
  name: "Tu Hoang",
  alternateName: "AndyT2503",
  title: "Software Engineer",
  github: "https://github.com/AndyT2503",
  linkedin: "https://www.linkedin.com/in/tu-hoang-787951195/",
  facebook: "https://www.facebook.com/AndyTu.Hoang/",
  image: `${DOMAIN}/assets/img/avatar.jpg`,
};

// ===== Utils =====
function slugify(title) {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function formatDate(dateStr) {
  return new Date(dateStr).toISOString();
}

function withSlash(url) {
  return url.endsWith("/") ? url : url + "/";
}

// ===== Load =====
const blogs = JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));
const template = fs.readFileSync(path.join(DIST_PATH, "index.html"), "utf-8");

// ===== Clean old SEO =====
function cleanHead(html) {
  return html
    .replace(/<title>.*<\/title>/, "")
    .replace(/<meta name="description".*?>/, "")
    .replace(/<meta name="keywords".*?>/, "")
    .replace(/<meta property="og:.*?>/g, "")
    .replace(/<meta name="twitter:.*?>/g, "");
}

// ===== HOMEPAGE SEO =====
function injectHomeSEO(html) {
  const title = "Tu Hoang - Angular Software Engineer";

  const description =
    "Personal website of Tu Hoang (AndyT2503), a Software Engineer specializing in Angular and TypeScript. Sharing insights, experiences, and articles about Angular and web development.";

  const url = withSlash(DOMAIN);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: AUTHOR.name,
    alternateName: AUTHOR.alternateName,
    url: DOMAIN,
    image: AUTHOR.image,
    jobTitle: AUTHOR.title,
    knowsAbout: ["Angular", "TypeScript", "Web Development"],
    sameAs: [AUTHOR.github, AUTHOR.linkedin, AUTHOR.facebook],
  };

  const seo = `
<title>${title}</title>

<meta name="description" content="${description}" />
<meta name="keywords" content="Tu Hoang, AndyT2503, Tu Hoang dev, tuhoangdev, tuhoang software engineer, Angular developer, TypeScript developer" />

<meta name="robots" content="index, follow" />
<meta name="googlebot" content="index, follow, max-image-preview:large" />

<link rel="canonical" href="${url}" />

<meta property="og:type" content="website" />
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${description}" />
<meta property="og:url" content="${url}" />
<meta property="og:image" content="${AUTHOR.image}" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${title}" />
<meta name="twitter:description" content="${description}" />
<meta name="twitter:image" content="${AUTHOR.image}" />

<script type="application/ld+json">
${JSON.stringify(jsonLd)}
</script>
`;

  return cleanHead(html).replace("</head>", `${seo}</head>`);
}

// ===== BLOG SEO =====
function injectBlogSEO(html, seoData) {
  const { title, description, url, image, date, type } = seoData;

  const fullTitle = `${title} | Angular & TypeScript Insights by Tu Hoang`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: fullTitle,
    description: description,
    image: image,
    url: url,
    datePublished: date,
    author: {
      "@type": "Person",
      name: AUTHOR.name,
    },
    keywords: `Angular, TypeScript, Tu Hoang, AndyT2503, tuhoangdev`,
  };

  const seo = `
<title>${fullTitle}</title>

<meta name="description" content="${description}" />
<meta name="keywords" content="Angular, TypeScript, Tu Hoang, AndyT2503, tuhoangdev" />

<meta name="robots" content="index, follow" />
<meta name="googlebot" content="index, follow, max-image-preview:large" />

<link rel="canonical" href="${url}" />

<meta property="og:type" content="article" />
<meta property="og:title" content="${fullTitle}" />
<meta property="og:description" content="${description}" />
<meta property="og:image" content="${image}" />
<meta property="og:url" content="${url}" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${fullTitle}" />
<meta name="twitter:description" content="${description}" />
<meta name="twitter:image" content="${image}" />

<script type="application/ld+json">
${JSON.stringify(jsonLd)}
</script>
`;

  return cleanHead(html).replace("</head>", `${seo}</head>`);
}

// ===== GENERATE HOMEPAGE =====
fs.writeFileSync(path.join(DIST_PATH, "index.html"), injectHomeSEO(template));

// ===== GENERATE BLOG PAGES =====
blogs.forEach((blog) => {
  const slug = slugify(blog.title);
  const url = withSlash(`${DOMAIN}/blog/${slug}`);
  const image = `${DOMAIN}/content/images/${slug}/default.jpg`;

  const finalHtml = injectBlogSEO(template, {
    title: blog.title,
    description: blog.description,
    url,
    image,
    date: formatDate(blog.date),
    type: blog.type,
  });

  const outputDir = path.join(DIST_PATH, "blog", slug);
  fs.mkdirSync(outputDir, { recursive: true });

  fs.writeFileSync(path.join(outputDir, "index.html"), finalHtml);
});

console.log("🔥 PRERENDER SEO DONE");
