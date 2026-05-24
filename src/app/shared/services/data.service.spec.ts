import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';
import { Blog, IBlog } from '../models';

describe('DataService', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(0));

    TestBed.configureTestingModule({
      providers: [DataService, provideHttpClient(), provideHttpClientTesting()],
    });
  });

  afterEach(() => {
    TestBed.inject(HttpTestingController).verify();
    vi.useRealTimers();
  });

  it('requests work experience JSON with a cache-busting timestamp', () => {
    const service = TestBed.inject(DataService);
    const httpMock = TestBed.inject(HttpTestingController);

    service.getWorkExperienceData().subscribe();

    const req = httpMock.expectOne('assets/data/work-experience.json?t=0');
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });

  it('requests normal projects JSON with a cache-busting timestamp', () => {
    const service = TestBed.inject(DataService);
    const httpMock = TestBed.inject(HttpTestingController);

    service.getNormalProjectData().subscribe();

    const req = httpMock.expectOne('assets/data/normal-project.json?t=0');
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });

  it('requests featured projects JSON with a cache-busting timestamp', () => {
    const service = TestBed.inject(DataService);
    const httpMock = TestBed.inject(HttpTestingController);

    service.getFeaturedProjectData().subscribe();

    const req = httpMock.expectOne('assets/data/featured-project.json?t=0');
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });

  it('maps blog JSON into Blog model instances', async () => {
    const service = TestBed.inject(DataService);
    const httpMock = TestBed.inject(HttpTestingController);

    const resultPromise = new Promise<Blog[]>((resolve) =>
      service.getBlogData().subscribe(resolve),
    );

    const req = httpMock.expectOne('assets/data/blog.json?t=0');
    expect(req.request.method).toBe('GET');
    const payload: IBlog[] = [
      {
        id: 1,
        title: 'Hello World',
        type: 'post',
        date: '2026-01-01',
        description: 'd',
        readingTime: 5,
        relatedBlogs: [],
      },
    ];
    req.flush(payload);

    const result = await resultPromise;
    expect(result[0]).toBeInstanceOf(Blog);
    expect(result[0].slug).toBe('hello-world');
  });

  it('returns blog by slug', async () => {
    const service = TestBed.inject(DataService);
    const httpMock = TestBed.inject(HttpTestingController);

    const resultPromise = new Promise<Blog>((resolve) =>
      service.getBlogDataBySlug('hello-world').subscribe(resolve),
    );

    const req = httpMock.expectOne('assets/data/blog.json?t=0');
    expect(req.request.method).toBe('GET');
    req.flush([
      {
        id: 1,
        title: 'Hello World',
        type: 'post',
        date: '2026-01-01',
        description: 'd',
        readingTime: 5,
        relatedBlogs: [],
      } satisfies IBlog,
    ]);

    const result = await resultPromise;
    expect(result).toBeInstanceOf(Blog);
    expect(result.slug).toBe('hello-world');
  });

  it('throws a "not found" error when no blog matches the slug', async () => {
    const service = TestBed.inject(DataService);
    const httpMock = TestBed.inject(HttpTestingController);

    const errorPromise = new Promise<unknown>((resolve) =>
      service.getBlogDataBySlug('missing').subscribe({
        next: resolve,
        error: resolve,
      }),
    );

    const req = httpMock.expectOne('assets/data/blog.json?t=0');
    expect(req.request.method).toBe('GET');
    req.flush([
      {
        id: 1,
        title: 'Hello World',
        type: 'post',
        date: '2026-01-01',
        description: 'd',
        readingTime: 5,
        relatedBlogs: [],
      } satisfies IBlog,
    ]);

    const error = await errorPromise;
    expect(error).toBeInstanceOf(Error);
    expect((error as Error).message).toContain('Blog with slug "missing" not found');
  });

  it('returns related blogs (from relatedBlogs) sorted by newest first', async () => {
    const service = TestBed.inject(DataService);
    const httpMock = TestBed.inject(HttpTestingController);

    const resultPromise = new Promise<Blog[]>((resolve) =>
      service.getRelatedBlogs('angular-signal-forms-simpler-faster-and-more-reactive').subscribe(resolve),
    );

    const req = httpMock.expectOne('assets/data/blog.json?t=0');
    expect(req.request.method).toBe('GET');

    const payload: IBlog[] = [
      {
        id: 1,
        title: 'Angular Signal Forms: Simpler, Faster, and More Reactive',
        type: 'Angular',
        date: '2026-02-25',
        description: 'd',
        readingTime: 7,
        relatedBlogs: [2, 3],
      },
      {
        id: 2,
        title: 'How Angular Change Detection works without Zone.js',
        type: 'Angular',
        date: '2026-04-29',
        description: 'd',
        readingTime: 6,
        relatedBlogs: [],
      },
      {
        id: 3,
        title: 'The Power of Conditional Type in Angular',
        type: 'Angular',
        date: '2023-08-28',
        description: 'd',
        readingTime: 4,
        relatedBlogs: [],
      },
      {
        id: 4,
        title: 'Fix 404 error when refreshing Github Page with Custom Builder',
        type: 'Angular',
        date: '2023-03-28',
        description: 'd',
        readingTime: 6,
        relatedBlogs: [],
      },
      {
        id: 5,
        title: 'Random SEO Post',
        type: 'SEO',
        date: '2026-05-01',
        description: 'd',
        readingTime: 2,
        relatedBlogs: [],
      },
    ];

    req.flush(payload);

    const result = await resultPromise;
    expect(result).toHaveLength(2);
    expect(result.map((b) => b.slug)).toEqual([
      'how-angular-change-detection-works-without-zonejs',
      'the-power-of-conditional-type-in-angular',
    ]);
  });

  it('throws when requesting related blogs for unknown slug', async () => {
    const service = TestBed.inject(DataService);
    const httpMock = TestBed.inject(HttpTestingController);

    const resultPromise = new Promise<unknown>((resolve) =>
      service.getRelatedBlogs('missing').subscribe({
        next: resolve,
        error: resolve,
      }),
    );

    const req = httpMock.expectOne('assets/data/blog.json?t=0');
    expect(req.request.method).toBe('GET');
    req.flush([
      {
        id: 1,
        title: 'Hello World',
        type: 'post',
        date: '2026-01-01',
        description: 'd',
        readingTime: 5,
        relatedBlogs: [],
      } satisfies IBlog,
    ]);

    const result = await resultPromise;
    expect(result).toBeInstanceOf(Error);
  });
});
