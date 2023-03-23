import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component, inject
} from '@angular/core';
import { Blog } from 'src/app/shared/models';
import { DataService } from 'src/app/shared/services';
import { trackByProp } from 'src/app/shared/utils';
import { BlogItemComponent } from './components/blog-item/blog-item.component';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, BlogItemComponent],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogComponent {
  readonly listBlog$ = inject(DataService).getBlogData();
  readonly trackByBlogId = trackByProp<Blog>('id');
}
