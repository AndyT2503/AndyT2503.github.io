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
import { DataService, SeoService } from '@shared/services';
import { MarkdownModule } from 'ngx-markdown';
import { BlogHeaderCardComponent } from './components/blog-header-card/blog-header-card.component';
import { injectWindow } from '@shared/providers';
import { MenuService } from '@shared/services/menu.service';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [MarkdownModule, BlogHeaderCardComponent],
  templateUrl: './blog-detail.component.html',
  styleUrls: [
    './blog-detail.component.scss',
    './blog-detail.markdown.scss',
    './blog-detail.markdown-blocks.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BlogDetailComponent implements OnInit {
  private readonly dataService = inject(DataService);
  private readonly router = inject(Router);
  private readonly seoService = inject(SeoService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly window = injectWindow();
  private readonly menuService = inject(MenuService);
  readonly slug = input.required<string>();
  readonly blog = signal<Blog | null>(null);

  readonly thumbnailUrl = computed(() => {
    return `content/images/${this.slug()}/default.jpg`;
  });

  ngOnInit(): void {
    this.menuService.setActiveSection('blog');
    this.scrollToTop();
    this.loadBlog();
  }


  private loadBlog(): void {
    if (!this.slug()) {
      this.router.navigate(['/'], { fragment: 'blog' });
      return;
    }

    this.dataService.getBlogData().subscribe({
      next: (blogs) => this.handleBlog(blogs),
    });
  }

  private handleBlog(blogs: Blog[]): void {
    const blog = blogs.find((b) => b.slug === this.slug());

    if (!blog) {
      this.router.navigate(['/'], { fragment: 'blog' });
      return;
    }

    this.blog.set(blog);

    this.applySeo(blog);
  }

  private applySeo(blog: Blog): void {
    this.seoService.applyBlog(blog, this.slug());
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
