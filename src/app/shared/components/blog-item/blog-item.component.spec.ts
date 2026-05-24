import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { BlogItemComponent } from './blog-item.component';
import { Blog } from '@shared/models';

describe('BlogItemComponent', () => {
  const blog = new Blog({
    id: 1,
    title: 'Hello World',
    type: 'post',
    date: '2026-01-01',
    description: 'Description',
    readingTime: 5,
    relatedBlogs: [],
  });

  it('renders blog metadata from the blog item', async () => {
    TestBed.configureTestingModule({
      imports: [BlogItemComponent],
      providers: [provideRouter([])],
    });

    const fixture = TestBed.createComponent(BlogItemComponent);
    fixture.componentRef.setInput('blogItem', blog);
    await fixture.whenStable();

    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('Hello World');
    expect(text).toContain('5 min');
  });

  it('renders a router link to the blog detail page', async () => {
    TestBed.configureTestingModule({
      imports: [BlogItemComponent],
      providers: [provideRouter([])],
    });

    const fixture = TestBed.createComponent(BlogItemComponent);
    fixture.componentRef.setInput('blogItem', blog);
    await fixture.whenStable();

    const link = fixture.nativeElement.querySelector('a') as HTMLAnchorElement;
    expect(link.getAttribute('href')).toBe('/blog/hello-world');
  });
});
