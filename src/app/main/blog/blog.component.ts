import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogItemComponent } from './components/blog-item/blog-item.component';
import { LIST_BLOG } from 'src/app/shared/data';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, BlogItemComponent],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogComponent {
  readonly listBlog = LIST_BLOG;
}
