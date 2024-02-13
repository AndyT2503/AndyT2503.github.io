
import {
  ChangeDetectionStrategy,
  Component, inject
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { DataService } from 'src/app/shared/services';
import { BlogItemComponent } from './components/blog-item/blog-item.component';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [BlogItemComponent],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogComponent {
  readonly listBlog = toSignal(inject(DataService).getBlogData());
}
