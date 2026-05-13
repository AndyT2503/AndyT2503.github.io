import { TestBed } from '@angular/core/testing';

import { BlogHeaderCardComponent } from './blog-header-card.component';
import { Blog } from '@shared/models';

describe('BlogHeaderCardComponent', () => {
  it('renders blog metadata from the blog input', async () => {
    const blog = new Blog({
      id: 1,
      title: 'Hello World',
      type: 'post',
      date: '2026-01-01',
      description: 'Description',
      readingTime: 5,
    });

    TestBed.configureTestingModule({
      imports: [BlogHeaderCardComponent],
    });

    const fixture = TestBed.createComponent(BlogHeaderCardComponent);
    fixture.componentRef.setInput('blog', blog);
    await fixture.whenStable();

    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('Hello World');
    expect(text).toContain('2026-01-01');
    expect(text).toContain('5 min read');
  });
});
