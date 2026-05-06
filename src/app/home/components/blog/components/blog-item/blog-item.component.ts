import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
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
  selector: 'app-blog-item',
  standalone: true,
  imports: [RouterLink, LucideIconComponent],
  templateUrl: './blog-item.component.html',
  styleUrls: ['./blog-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogItemComponent implements OnInit {
  private readonly markDownService = inject(MarkdownService);

  readonly blogItem = input.required<Blog>();
  readonly readingTime = signal(0);

  readonly thumbnailUrl = computed(() => {
    const slug = this.blogItem().slug;
    return `content/images/${slug}/default.jpg`;
  });

  ngOnInit(): void {
    this.markDownService
      .getSource(`content/article/${this.blogItem().slug}.md`)
      .pipe(map((content) => calculateReadingTime(content).minutes))
      .subscribe((min) => {
        this.readingTime.set(min);
      });
  }
}
