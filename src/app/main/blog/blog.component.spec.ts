import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { BlogComponent } from './blog.component';
import { DataService } from '@shared/services';
import { Blog } from '@shared/models';

describe('BlogComponent', () => {
  it('exposes blog list as a signal', async () => {
    const blogs = [new Blog({ id: 1, title: 'T', type: 'post', date: '2026-01-01', description: 'd' })];

    TestBed.overrideComponent(BlogComponent, { set: { template: '' } });
    TestBed.configureTestingModule({
      imports: [BlogComponent],
      providers: [{ provide: DataService, useValue: { getBlogData: vi.fn(() => of(blogs)) } }],
    });

    const fixture = TestBed.createComponent(BlogComponent);
    await fixture.whenStable();

    expect(fixture.componentInstance.listBlog()).toEqual(blogs);
  });
});
