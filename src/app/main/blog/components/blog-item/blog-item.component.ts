import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Blog } from 'src/app/shared/models';
import fs from 'fs';
import { calculateReadingTime } from 'markdown-reading-time';
import { MarkdownService } from 'ngx-markdown';

@Component({
  selector: 'app-blog-item[blogItem]',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './blog-item.component.html',
  styleUrls: ['./blog-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogItemComponent implements OnInit {
  @Input() blogItem!: Blog;
  private readonly router = inject(Router);
  private readonly markDownService = inject(MarkdownService);
  private readonly cdr = inject(ChangeDetectorRef);
  ngOnInit(): void {
    this.getReadingTime();
  }

  getReadingTime(): void {
    this.markDownService
      .getSource(`content/article/${this.blogItem.slug}.md`)
      .subscribe((content) => {
        const readingStats = calculateReadingTime(content);
        this.blogItem.minRead = readingStats.minutes;
        this.cdr.markForCheck();
      });
  }

  showDetail(): void {
    this.router.navigate([`/blog/${this.blogItem.slug}`]);
  }
}
