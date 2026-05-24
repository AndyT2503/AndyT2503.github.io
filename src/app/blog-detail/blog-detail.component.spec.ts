import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

import { BlogDetailComponent } from './blog-detail.component';
import { Blog } from '@shared/models';
import { DataService, SeoService } from '@shared/services';
import { MenuService } from '@shared/services/menu.service';

describe('BlogDetailComponent', () => {
  function setup(slug: string, blog: Blog | null = null) {
    const dataService = {
      getBlogDataBySlug: vi.fn(() =>
        blog ? of(blog) : throwError(() => new Error('missing')),
      ),
    };
    const menuService = { setActiveSection: vi.fn() };
    const router = { navigate: vi.fn(() => Promise.resolve(true)) };
    const seoService = { applyBlog: vi.fn() };
    const scrollSpy = vi.spyOn(window, 'scroll').mockImplementation(() => {});

    TestBed.overrideComponent(BlogDetailComponent, { set: { template: '' } });
    TestBed.configureTestingModule({
      imports: [BlogDetailComponent],
      providers: [
        { provide: DataService, useValue: dataService },
        { provide: MenuService, useValue: menuService },
        { provide: Router, useValue: router },
        { provide: SeoService, useValue: seoService },
        { provide: PLATFORM_ID, useValue: 'browser' },
      ],
    });

    const fixture = TestBed.createComponent(BlogDetailComponent);
    fixture.componentRef.setInput('slug', slug);

    return { fixture, dataService, menuService, router, seoService, scrollSpy };
  }

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('loads the matching blog and applies blog SEO', async () => {
    const blog = new Blog({
      id: 1,
      title: 'Hello World',
      type: 'post',
      date: '2026-01-01',
      description: 'Description',
      readingTime: 5,
      relatedBlogs: [],
    });
    const { fixture, seoService, router, scrollSpy, dataService } = setup(
      'hello-world',
      blog,
    );

    fixture.componentInstance.ngOnInit();
    await fixture.whenStable();

    expect(dataService.getBlogDataBySlug).toHaveBeenCalledWith('hello-world');
    expect(fixture.componentInstance.blogResource.value()).toBe(blog);
    expect(fixture.componentInstance.thumbnailUrl()).toBe(
      'content/images/hello-world/default.jpg',
    );
    expect(seoService.applyBlog).toHaveBeenCalledWith(blog, 'hello-world');
    expect(router.navigate).not.toHaveBeenCalled();
    expect(scrollSpy).toHaveBeenCalledWith({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  });

  it('navigates back to blog section when no blog matches the slug', async () => {
    const { fixture, seoService, router } = setup('missing-post', null);

    fixture.componentInstance.ngOnInit();
    await fixture.whenStable();

    expect(seoService.applyBlog).not.toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/'], { fragment: 'blog' });
  });
});
