import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { RelatedBlogsComponent } from './related-blogs.component';
import { DataService } from '@shared/services';
import { Blog } from '@shared/models';

describe('RelatedBlogsComponent', () => {
  let component: RelatedBlogsComponent;
  let fixture: ComponentFixture<RelatedBlogsComponent>;
  let dataService: { getRelatedBlogs: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    dataService = {
      getRelatedBlogs: vi.fn(() =>
        of([
          new Blog({
            id: 1,
            title: 'Hello World',
            type: 'post',
            date: '2026-01-01',
            description: 'd',
            readingTime: 5,
            relatedBlogs: [],
          }),
          new Blog({
            id: 2,
            title: 'Another Post',
            type: 'post',
            date: '2026-01-02',
            description: 'd',
            readingTime: 5,
            relatedBlogs: [],
          }),
        ]),
      ),
    };

    TestBed.overrideComponent(RelatedBlogsComponent, { set: { template: '' } });
    await TestBed.configureTestingModule({
      imports: [RelatedBlogsComponent],
      providers: [
        {
          provide: DataService,
          useValue: dataService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RelatedBlogsComponent);
    component = fixture.componentInstance;
  });

  it('creates', () => {
    expect(component).toBeTruthy();
  });

  it('loads related blogs based on the slug input', async () => {
    fixture.componentRef.setInput('slug', 'test-slug');
    await fixture.whenStable();

    expect(dataService.getRelatedBlogs).toHaveBeenCalledTimes(1);
    expect(dataService.getRelatedBlogs).toHaveBeenCalledWith('test-slug');
    expect(component.listBlog()?.map((blog) => blog.slug)).toEqual([
      'hello-world',
      'another-post',
    ]);
  });

  it('does not re-fetch when the slug input is unchanged', async () => {
    fixture.componentRef.setInput('slug', 'test-slug');
    await fixture.whenStable();

    fixture.componentRef.setInput('slug', 'test-slug');
    await fixture.whenStable();

    expect(dataService.getRelatedBlogs).toHaveBeenCalledTimes(1);
  });
});
