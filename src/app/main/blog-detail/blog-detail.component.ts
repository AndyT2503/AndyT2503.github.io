import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MarkdownModule } from 'ngx-markdown';
import { DataService } from '../../shared/services/data.service';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [MarkdownModule],
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogDetailComponent implements OnInit {
  @Input() slug!: string;

  private readonly titleService = inject(Title);
  private readonly dataService = inject(DataService);

  ngOnInit(): void {
    this.scrollToTop();
    this.setTitle();
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
