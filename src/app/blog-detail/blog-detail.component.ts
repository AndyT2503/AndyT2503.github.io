import { isPlatformServer } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  PLATFORM_ID,
  ViewEncapsulation,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { Blog } from '@shared/models';
import { injectWindow } from '@shared/providers';
import { DataService, SeoService } from '@shared/services';
import { MenuService } from '@shared/services/menu.service';
import { MarkdownModule } from 'ngx-markdown';
import { BlogHeaderCardComponent } from './components/blog-header-card/blog-header-card.component';
import { RelatedBlogsComponent } from './components/related-blogs/related-blogs.component';
import { rxResource } from '@angular/core/rxjs-interop';
import { catchError, tap } from 'rxjs';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [MarkdownModule, BlogHeaderCardComponent, RelatedBlogsComponent],
  templateUrl: './blog-detail.component.html',
  styleUrls: [
    './blog-detail.component.scss',
    './blog-detail.markdown.scss',
    './blog-detail.markdown-blocks.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogDetailComponent implements OnInit {
  private readonly dataService = inject(DataService);
  private readonly router = inject(Router);
  private readonly seoService = inject(SeoService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly window = injectWindow();
  private readonly menuService = inject(MenuService);
  readonly slug = input.required<string>();

  readonly thumbnailUrl = computed(() => {
    return `content/images/${this.slug()}/default.jpg`;
  });

  readonly blogResource = rxResource<Blog | null, string>({
    params: () => this.slug(),
    stream: (resourceParams) =>
      this.dataService.getBlogDataBySlug(resourceParams.params).pipe(
        tap({
          next: (blog) => {
            this.scrollToTop();
            this.seoService.applyBlog(blog, resourceParams.params);
          },
          error: () => {
            this.router.navigate(['/'], { fragment: 'blog' });
          },
        }),
      ),
    defaultValue: null,
  });

  ngOnInit(): void {
    this.menuService.setActiveSection('blog');
  }

  private scrollToTop(): void {
    if (isPlatformServer(this.platformId)) return;

    this.window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
