import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

import { BlogDetailComponent } from './blog-detail.component';
import { Title } from '@angular/platform-browser';
import { DataService } from '@shared/services';
import { Blog } from '@shared/models';

describe('BlogDetailComponent', () => {
  it('sets a default title when slug is missing', async () => {
    const title = { setTitle: vi.fn() };
    const dataService = { getBlogData: vi.fn(() => of([])) };
    const scrollSpy = vi.spyOn(window, 'scroll').mockImplementation(() => {});

    TestBed.overrideComponent(BlogDetailComponent, { set: { template: '' } });
    TestBed.configureTestingModule({
      imports: [BlogDetailComponent],
      providers: [
        { provide: Title, useValue: title },
        { provide: DataService, useValue: dataService },
      ],
    });

    const fixture = TestBed.createComponent(BlogDetailComponent);
    fixture.componentInstance.slug = '';
    fixture.componentInstance.ngOnInit();
    await fixture.whenStable();

    expect(title.setTitle).toHaveBeenCalledWith('Tu Hoang');
    expect(scrollSpy).toHaveBeenCalled();
    scrollSpy.mockRestore();
  });

  it('sets the title based on the matching blog slug', async () => {
    const title = { setTitle: vi.fn() };
    const dataService = {
      getBlogData: vi.fn(() =>
        of([new Blog({ id: 1, title: 'Hello World', type: 'post', date: '2026-01-01', description: 'd' })]),
      ),
    };
    vi.spyOn(window, 'scroll').mockImplementation(() => {});

    TestBed.overrideComponent(BlogDetailComponent, { set: { template: '' } });
    TestBed.configureTestingModule({
      imports: [BlogDetailComponent],
      providers: [
        { provide: Title, useValue: title },
        { provide: DataService, useValue: dataService },
      ],
    });

    const fixture = TestBed.createComponent(BlogDetailComponent);
    fixture.componentInstance.slug = 'hello-world';
    fixture.componentInstance.ngOnInit();
    await fixture.whenStable();

    expect(title.setTitle).toHaveBeenCalledWith('Tu Hoang - Hello World');
  });

  it('falls back to default title when blog data fails', async () => {
    const title = { setTitle: vi.fn() };
    const dataService = { getBlogData: vi.fn(() => throwError(() => new Error('fail'))) };
    vi.spyOn(window, 'scroll').mockImplementation(() => {});

    TestBed.overrideComponent(BlogDetailComponent, { set: { template: '' } });
    TestBed.configureTestingModule({
      imports: [BlogDetailComponent],
      providers: [
        { provide: Title, useValue: title },
        { provide: DataService, useValue: dataService },
      ],
    });

    const fixture = TestBed.createComponent(BlogDetailComponent);
    fixture.componentInstance.slug = 'anything';
    fixture.componentInstance.ngOnInit();
    await fixture.whenStable();

    expect(title.setTitle).toHaveBeenCalledWith('Tu Hoang');
  });
});
