import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MarkdownModule } from 'ngx-markdown';
import { DataService } from '../../shared/services/data.service';
import { Blog } from '@shared/models';
import { LucideIconComponent } from '@shared/components';
import { calculateReadingTime } from 'markdown-reading-time';
import { MarkdownService } from 'ngx-markdown';
import { map } from 'rxjs';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [MarkdownModule, LucideIconComponent],
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogDetailComponent implements OnInit {
  @Input() slug!: string;

  private readonly titleService = inject(Title);
  private readonly dataService = inject(DataService);
  private readonly markdownService = inject(MarkdownService);

  readonly blog = signal<Blog | null>(null);
  readonly readingTime = signal(0);

  ngOnInit(): void {
    this.scrollToTop();
    this.setTitle();
    this.calculateReadTime();
  }

  private setTitle(): void {
    const defaultTitle = 'Tu Hoang - Angular Software Engineer';

    if (!this.slug || typeof window === 'undefined') {
      this.titleService.setTitle(defaultTitle);
      return;
    }

    this.dataService.getBlogData().subscribe({
      next: (blogs) => {
        const blog = blogs.find((item) => item.slug === this.slug);
        this.blog.set(blog ?? null);

        if (blog) {
          this.titleService.setTitle(
            `${blog.title} | Angular & TypeScript Insights by Tu Hoang`,
          );
        } else {
          this.titleService.setTitle(defaultTitle);
        }
      },
      error: () => this.titleService.setTitle(defaultTitle),
    });
  }

  private calculateReadTime(): void {
    if (!this.slug) return;

    this.markdownService
      .getSource(`content/article/${this.slug}.md`)
      .pipe(map((content) => calculateReadingTime(content).minutes))
      .subscribe((min) => this.readingTime.set(min));
  }

  private scrollToTop(): void {
    if (typeof window === 'undefined') {
      return;
    }
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
