
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { calculateReadingTime } from 'markdown-reading-time';
import { MarkdownService } from 'ngx-markdown';
import { map } from 'rxjs';
import { Blog } from '@shared/models';
import { LucideIconComponent } from '@shared/components';

@Component({
  selector: 'app-blog-item[blogItem]',
  standalone: true,
  imports: [RouterLink, LucideIconComponent],
  templateUrl: './blog-item.component.html',
  styleUrls: ['./blog-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogItemComponent implements OnInit {
  @Input({ required: true }) blogItem!: Blog;
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
}
