import { Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { IBlog } from '@shared/models';
import { injectEnvironment } from '@shared/providers';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);
  private readonly domainUrl = injectEnvironment().domainUrl;

  apply(blog: IBlog, slug: string): void {
    const fullTitle = this.buildTitle(blog);
    const url = this.buildUrl(slug);
    const image = this.buildImage(slug);

    this.setTitle(fullTitle);
    this.setMeta(blog, fullTitle, url, image);
    this.setCanonical(url);
    this.setJsonLd(blog, fullTitle, url, image);
  }

  private setTitle(title: string): void {
    this.title.setTitle(title);
  }

  private setMeta(blog: IBlog, title: string, url: string, image: string): void {
    this.meta.updateTag({ name: 'description', content: blog.description });

    this.meta.updateTag({
      name: 'keywords',
      content: 'Angular, TypeScript, Tu Hoang, AndyT2503, tuhoangdev',
    });

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

    this.meta.updateTag({ property: 'og:type', content: 'article' });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: blog.description });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ property: 'og:url', content: url });

    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: blog.description });
    this.meta.updateTag({ name: 'twitter:image', content: image });
  }

  private setCanonical(url: string): void {
    let link = this.document.querySelector("link[rel='canonical']") as HTMLLinkElement;

    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }

    link.setAttribute('href', url);
  }

  private setJsonLd(blog: IBlog, title: string, url: string, image: string): void {
    this.removeExistingJsonLd();

    const script = this.document.createElement('script');
    script.id = 'json-ld';
    script.type = 'application/ld+json';

    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        this.personSchema(),
        this.blogSchema(blog, title, url, image),
      ],
    });

    this.document.head.appendChild(script);
  }

  private removeExistingJsonLd(): void {
    const existing = this.document.getElementById('json-ld');
    if (existing) existing.remove();
  }

  private personSchema() {
    return {
      '@type': 'Person',
      name: 'Tu Hoang',
      alternateName: 'AndyT2503',
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

  private blogSchema(blog: IBlog, title: string, url: string, image: string) {
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

  private buildTitle(blog: IBlog): string {
    return `${blog.title} | Angular & TypeScript Insights by Tu Hoang`;
  }

  private buildUrl(slug: string): string {
    return `${this.domainUrl}/blog/${slug}`;
  }

  private buildImage(slug: string): string {
    return `${this.domainUrl}/content/images/${slug}/default.jpg`;
  }
}
