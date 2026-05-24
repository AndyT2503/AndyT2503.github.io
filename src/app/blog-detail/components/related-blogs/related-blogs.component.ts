import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { BlogItemComponent } from '@shared/components';
import { DataService } from '@shared/services';
import { distinctUntilChanged, switchMap } from 'rxjs';

@Component({
  selector: 'app-related-blogs',
  imports: [BlogItemComponent],
  templateUrl: './related-blogs.component.html',
  styleUrl: './related-blogs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RelatedBlogsComponent {
  private readonly dataService = inject(DataService);
  readonly slug = input.required<string>();

  readonly listBlog = toSignal(
    toObservable(this.slug).pipe(
      distinctUntilChanged(),
      switchMap((slug) => this.dataService.getRelatedBlogs(slug)),
    ),
  );
}
