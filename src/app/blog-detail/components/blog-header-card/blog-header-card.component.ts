import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { LucideIconComponent } from '@shared/components/lucide-icon/lucide-icon.component';
import { Blog } from '@shared/models';
import { calculateReadingTime } from 'markdown-reading-time';
import { MarkdownService } from 'ngx-markdown';
import { map } from 'rxjs';

@Component({
  selector: 'app-blog-header-card',
  imports: [LucideIconComponent],
  templateUrl: './blog-header-card.component.html',
  styleUrl: './blog-header-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogHeaderCardComponent implements OnInit {
  private readonly markdownService = inject(MarkdownService);

  readonly blog = input.required<Blog>();
  readonly readingTime = signal<number>(0);

  ngOnInit(): void {
    this.calculateReadingTime();
  }

  private calculateReadingTime(): void {
    this.markdownService
      .getSource(`content/article/${this.blog().slug}.md`)
      .pipe(map((content) => calculateReadingTime(content).minutes))
      .subscribe((min) => this.readingTime.set(min));
  }
}
