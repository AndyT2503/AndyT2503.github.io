import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { DataService } from '@shared/services';
import { BlogItemComponent } from '../../../shared/components';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [BlogItemComponent],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogComponent {
  private readonly dataService = inject(DataService);
  readonly listBlog = rxResource({
    stream: () => this.dataService.getBlogData(),
    defaultValue: [],
  });
}
