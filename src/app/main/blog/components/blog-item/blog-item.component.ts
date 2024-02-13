
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
  signal,
  Signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { calculateReadingTime } from 'markdown-reading-time';
import { MarkdownService } from 'ngx-markdown';
import { map } from 'rxjs';
import { Blog } from 'src/app/shared/models';

@Component({
  selector: 'app-blog-item[blogItem]',
  standalone: true,
  templateUrl: './blog-item.component.html',
  styleUrls: ['./blog-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogItemComponent implements OnInit {
  @Input({ required: true }) blogItem!: Blog;
  private readonly router = inject(Router);
  private readonly markDownService = inject(MarkdownService);
  readingTime = signal(0);

  ngOnInit(): void {
    this.markDownService
      .getSource(`content/article/${this.blogItem.slug}.md`)
      .pipe(map((content) => calculateReadingTime(content).minutes))
      .subscribe((min) => {
        this.readingTime.set(min);
      });
  }

  showDetail(): void {
    this.router.navigate([`/blog/${this.blogItem.slug}`]);
  }
}
