import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { IBlog } from '@shared/models';
import { injectEnvironment } from '@shared/providers';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);
  private readonly domainUrl = injectEnvironment().domainUrl;

  applyHome(): void {
    const title = 'Tu Hoang - Angular Software Engineer';
    const url = `${this.domainUrl}`;
    const image = `${this.domainUrl}/assets/img/avatar.jpg`;

    this.setTitle(title);
    this.setMetaTags({
      description:
        'Tu Hoang (AndyT2503) is a Software Engineer specializing in Angular and TypeScript. On TuHoangDev, he shares insights, articles, and personal experiences about modern web development.',
      keywords:
        'Tu Hoang, AndyT2503, tuhoangdev, Angular developer, TypeScript developer, Frontend Engineer, Angular blog, web development',
      ogType: 'website',
      ogTitle: title,
      ogDescription:
        'Tu Hoang (AndyT2503) is a Software Engineer specializing in Angular and TypeScript. On TuHoangDev, he shares insights, articles, and personal experiences about modern web development.',
      ogImage: image,
      ogUrl: url,
      twitterCard: 'summary_large_image',
      twitterTitle: title,
      twitterDescription:
        'Angular & TypeScript insights, tutorials, and real-world experience from Tu Hoang.',
      twitterImage: image,
    });
    this.setCanonical(url);
    this.setJsonLd({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Tu Hoang',
      alternateName: ['TuHoangDev', 'AndyT2503', 'tuhoangdev'],
      url,
      image,
      jobTitle: 'Software Engineer',
      knowsAbout: [
        'Angular',
        'TypeScript',
        'Web Development',
        'Frontend Architecture',
      ],
      sameAs: [
        'https://github.com/AndyT2503',
        'https://www.linkedin.com/in/tu-hoang-787951195/',
        'https://www.facebook.com/AndyTu.Hoang/',
      ],
    });
  }

  applyBlog(blog: IBlog, slug: string): void {
    const fullTitle = this.buildBlogTitle(blog);
    const url = this.buildBlogUrl(slug);
    const image = this.buildBlogImage(slug);

    this.setTitle(fullTitle);
    this.setMetaTags({
      description: blog.description,
      keywords: 'Angular, TypeScript, Tu Hoang, AndyT2503, tuhoangdev',
      ogType: 'article',
      ogTitle: fullTitle,
      ogDescription: blog.description,
      ogImage: image,
      ogUrl: url,
      twitterCard: 'summary_large_image',
      twitterTitle: fullTitle,
      twitterDescription: blog.description,
      twitterImage: image,
    });
    this.setCanonical(url);
    this.setJsonLd({
      '@context': 'https://schema.org',
      '@graph': [
        this.buildPersonSchema(),
        this.buildBlogSchema(blog, fullTitle, url, image),
      ],
    });
  }

  private setTitle(title: string): void {
    this.title.setTitle(title);
  }

  private setMetaTags(config: {
    description: string;
    keywords: string;
    ogType: string;
    ogTitle: string;
    ogDescription: string;
    ogImage: string;
    ogUrl: string;
    twitterCard: string;
    twitterTitle: string;
    twitterDescription: string;
    twitterImage: string;
  }): void {
    this.meta.updateTag({
      name: 'description',
      content: config.description,
    });
    this.meta.updateTag({
      name: 'keywords',
      content: config.keywords,
    });
    this.meta.updateTag({
      property: 'og:type',
      content: config.ogType,
    });
    this.meta.updateTag({
      property: 'og:title',
      content: config.ogTitle,
    });
    this.meta.updateTag({
      property: 'og:description',
      content: config.ogDescription,
    });
    this.meta.updateTag({
      property: 'og:image',
      content: config.ogImage,
    });
    this.meta.updateTag({
      property: 'og:url',
      content: config.ogUrl,
    });
    this.meta.updateTag({
      name: 'twitter:card',
      content: config.twitterCard,
    });
    this.meta.updateTag({
      name: 'twitter:title',
      content: config.twitterTitle,
    });
    this.meta.updateTag({
      name: 'twitter:description',
      content: config.twitterDescription,
    });
    this.meta.updateTag({
      name: 'twitter:image',
      content: config.twitterImage,
    });
  }

  private setCanonical(url: string): void {
    let link = this.document.querySelector(
      "link[rel='canonical']",
    ) as HTMLLinkElement;

    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }

    link.setAttribute('href', url);
  }

  private setJsonLd(data: object, id = 'json-ld'): void {
    this.removeJsonLd(id);

    const script = this.document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);

    this.document.head.appendChild(script);
  }

  private removeJsonLd(id = 'json-ld'): void {
    this.document.getElementById(id)?.remove();
  }

  private buildPersonSchema() {
    return {
      '@type': 'Person',
      name: 'Tu Hoang',
      alternateName: ['TuHoangDev', 'AndyT2503', 'tuhoangdev'],
      url: this.domainUrl,
      image: `${this.domainUrl}/assets/img/avatar.jpg`,
      jobTitle: 'Software Engineer',
      knowsAbout: ['Angular', 'TypeScript', 'Web Development'],
      sameAs: [
        'https://github.com/AndyT2503',
        'https://www.linkedin.com/in/tu-hoang-787951195/',
        'https://www.facebook.com/AndyTu.Hoang/',
      ],
    };
  }

  private buildBlogSchema(
    blog: IBlog,
    title: string,
    url: string,
    image: string,
  ) {
    return {
      '@type': 'BlogPosting',
      headline: title,
      description: blog.description,
      image,
      url,
      datePublished: new Date(blog.date).toISOString(),
      author: {
        '@type': 'Person',
        name: 'Tu Hoang',
      },
    };
  }

  private buildBlogTitle(blog: IBlog): string {
    return `${blog.title} | Angular & TypeScript Insights by Tu Hoang`;
  }

  private buildBlogUrl(slug: string): string {
    return `${this.domainUrl}/blog/${slug}`;
  }

  private buildBlogImage(slug: string): string {
    return `${this.domainUrl}/content/images/${slug}/default.jpg`;
  }
}
