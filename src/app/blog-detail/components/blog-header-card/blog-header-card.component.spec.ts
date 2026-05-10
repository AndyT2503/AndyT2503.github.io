import { TestBed } from '@angular/core/testing';
import { MarkdownService } from 'ngx-markdown';
import { of } from 'rxjs';

import { BlogHeaderCardComponent } from './blog-header-card.component';
import { Blog } from '@shared/models';

describe('BlogHeaderCardComponent', () => {
  it('renders blog metadata and calculates reading time', async () => {
    const markdownService = {
      getSource: vi.fn(() => of('word '.repeat(400))),
    };
    const blog = new Blog({
      id: 1,
      title: 'Hello World',
      type: 'post',
      date: '2026-01-01',
      description: 'Description',
    });

    TestBed.configureTestingModule({
      imports: [BlogHeaderCardComponent],
      providers: [{ provide: MarkdownService, useValue: markdownService }],
    });

    const fixture = TestBed.createComponent(BlogHeaderCardComponent);
    fixture.componentRef.setInput('blog', blog);
    fixture.componentInstance.ngOnInit();
    await fixture.whenStable();

    const text = fixture.nativeElement.textContent as string;
    expect(markdownService.getSource).toHaveBeenCalledWith(
      'content/article/hello-world.md',
    );
    expect(text).toContain('Hello World');
    expect(text).toContain('2026-01-01');
    expect(fixture.componentInstance.readingTime()).toBeGreaterThan(0);
  });
});
