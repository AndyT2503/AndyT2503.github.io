import { TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';

import { SeoService } from './seo.service';
import { Blog } from '@shared/models';
import { provideEnvironment } from '@shared/providers';

describe('SeoService', () => {
  const domainUrl = 'https://example.com';

  beforeEach(() => {
    document.head
      .querySelectorAll('meta, link[rel="canonical"], script#json-ld')
      .forEach((el) => el.remove());

    TestBed.configureTestingModule({
      providers: [
        SeoService,
        Title,
        Meta,
        provideEnvironment({
          repoName: 'repo',
          sourceControlApi: 'https://api.example.com/repos/',
          sourceControlUrl: 'https://example.com/',
          domainUrl,
          isOpenToWork: true,
        }),
      ],
    });
  });

  afterEach(() => {
    document.head
      .querySelectorAll('meta, link[rel="canonical"], script#json-ld')
      .forEach((el) => el.remove());
  });

  it('applies home title, canonical URL, social meta tags, and JSON-LD', () => {
    const service = TestBed.inject(SeoService);
    const title = TestBed.inject(Title);

    service.applyHome();

    expect(title.getTitle()).toBe('Tu Hoang - Angular Software Engineer');
    expect(
      document.querySelector('meta[property="og:type"]')?.getAttribute('content'),
    ).toBe('website');
    expect(
      document.querySelector('link[rel="canonical"]')?.getAttribute('href'),
    ).toBe(`${domainUrl}/`);

    const jsonLd = JSON.parse(
      document.querySelector('#json-ld')?.textContent ?? '{}',
    );
    expect(jsonLd['@type']).toBe('Person');
    expect(jsonLd.url).toBe(`${domainUrl}/`);
  });

  it('applies blog title, canonical URL, social meta tags, and JSON-LD', () => {
    const service = TestBed.inject(SeoService);
    const title = TestBed.inject(Title);
    const blog = new Blog({
      id: 1,
      title: 'Hello World',
      type: 'post',
      date: '2026-01-01',
      description: 'Description',
      readingTime: 5,
    });

    service.applyBlog(blog, 'hello-world');

    expect(title.getTitle()).toBe(
      'Hello World | Angular & TypeScript Insights by Tu Hoang',
    );
    expect(
      document.querySelector('meta[property="og:type"]')?.getAttribute('content'),
    ).toBe('article');
    expect(
      document.querySelector('meta[property="og:url"]')?.getAttribute('content'),
    ).toBe(`${domainUrl}/blog/hello-world`);
    expect(
      document.querySelector('link[rel="canonical"]')?.getAttribute('href'),
    ).toBe(`${domainUrl}/blog/hello-world`);

    const jsonLd = JSON.parse(
      document.querySelector('#json-ld')?.textContent ?? '{}',
    );
    expect(jsonLd['@graph'][1].headline).toBe(
      'Hello World | Angular & TypeScript Insights by Tu Hoang',
    );
  });
});
