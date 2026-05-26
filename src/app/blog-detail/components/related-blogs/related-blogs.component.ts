import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { BlogItemComponent } from '@shared/components';
import { DataService } from '@shared/services';

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
  readonly relatedBlogs = rxResource({
    params: this.slug,
    stream: (resourceParams) => this.dataService.getRelatedBlogs(resourceParams.params),
  })
}
