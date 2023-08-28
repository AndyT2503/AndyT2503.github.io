import { NgFor } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component, inject
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Blog } from 'src/app/shared/models';
import { DataService } from 'src/app/shared/services';
import { trackByProp } from 'src/app/shared/utils';
import { BlogItemComponent } from './components/blog-item/blog-item.component';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [BlogItemComponent, NgFor],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogComponent {
  readonly listBlog = toSignal(inject(DataService).getBlogData());
  readonly trackByBlogId = trackByProp<Blog>('id');
}
