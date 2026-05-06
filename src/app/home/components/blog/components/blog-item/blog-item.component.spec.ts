import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { BlogItemComponent } from './blog-item.component';
import { Blog } from '@shared/models';
import { Router } from '@angular/router';
import { MarkdownService } from 'ngx-markdown';

describe('BlogItemComponent', () => {
  it('computes reading time from the markdown source', async () => {
    const router = { navigate: vi.fn(() => Promise.resolve(true)) };
    const markdownService = {
      getSource: vi.fn(() => of('word '.repeat(400))),
    };

    TestBed.overrideComponent(BlogItemComponent, { set: { template: '' } });
    TestBed.configureTestingModule({
      imports: [BlogItemComponent],
      providers: [
        { provide: Router, useValue: router },
        { provide: MarkdownService, useValue: markdownService },
      ],
    });

    const fixture = TestBed.createComponent(BlogItemComponent);
    const component = fixture.componentInstance;
    component.blogItem = new Blog({
      id: 1,
      title: 'Hello World',
      type: 'post',
      date: '2026-01-01',
      description: 'd',
    });

    component.ngOnInit();
    await fixture.whenStable();

    expect(markdownService.getSource).toHaveBeenCalledWith('content/article/hello-world.md');
    expect(component.readingTime()).toBeGreaterThan(0);
  });

  it('navigates to the blog detail route', () => {
    const router = { navigate: vi.fn(() => Promise.resolve(true)) };
    const markdownService = { getSource: vi.fn(() => of('')) };

    TestBed.overrideComponent(BlogItemComponent, { set: { template: '' } });
    TestBed.configureTestingModule({
      imports: [BlogItemComponent],
      providers: [
        { provide: Router, useValue: router },
        { provide: MarkdownService, useValue: markdownService },
      ],
    });

    const fixture = TestBed.createComponent(BlogItemComponent);
    fixture.componentInstance.blogItem = new Blog({
      id: 1,
      title: 'Hello World',
      type: 'post',
      date: '2026-01-01',
      description: 'd',
    });

    fixture.componentInstance.showDetail();
    expect(router.navigate).toHaveBeenCalledWith(['/blog/hello-world']);
  });
});
