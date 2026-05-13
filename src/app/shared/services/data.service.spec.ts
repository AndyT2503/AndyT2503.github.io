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
      },
    ];
    req.flush(payload);

    const result = await resultPromise;
    expect(result[0]).toBeInstanceOf(Blog);
    expect(result[0].slug).toBe('hello-world');
  });
});

