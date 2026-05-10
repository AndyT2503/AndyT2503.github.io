import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MarkdownService } from 'ngx-markdown';
import { of } from 'rxjs';

import { BlogItemComponent } from './blog-item.component';
import { Blog } from '@shared/models';

describe('BlogItemComponent', () => {
  const blog = new Blog({
    id: 1,
    title: 'Hello World',
    type: 'post',
    date: '2026-01-01',
    description: 'Description',
  });

  it('computes reading time from the markdown source', async () => {
    const markdownService = {
      getSource: vi.fn(() => of('word '.repeat(400))),
    };

    TestBed.overrideComponent(BlogItemComponent, { set: { template: '' } });
    TestBed.configureTestingModule({
      imports: [BlogItemComponent],
      providers: [
        { provide: MarkdownService, useValue: markdownService },
        provideRouter([]),
      ],
    });

    const fixture = TestBed.createComponent(BlogItemComponent);
    fixture.componentRef.setInput('blogItem', blog);

    fixture.componentInstance.ngOnInit();
    await fixture.whenStable();

    expect(markdownService.getSource).toHaveBeenCalledWith(
      'content/article/hello-world.md',
    );
    expect(fixture.componentInstance.readingTime()).toBeGreaterThan(0);
  });

  it('renders a router link to the blog detail page', async () => {
    const markdownService = { getSource: vi.fn(() => of('')) };

    TestBed.configureTestingModule({
      imports: [BlogItemComponent],
      providers: [
        { provide: MarkdownService, useValue: markdownService },
        provideRouter([]),
      ],
    });

    const fixture = TestBed.createComponent(BlogItemComponent);
    fixture.componentRef.setInput('blogItem', blog);
    await fixture.whenStable();

    const link = fixture.nativeElement.querySelector('a') as HTMLAnchorElement;
    expect(link.getAttribute('href')).toBe('/blog/hello-world');
  });
});
