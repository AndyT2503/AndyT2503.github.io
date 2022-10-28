import {
  ChangeDetectionStrategy,
  Component,
  Input
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { Blog } from 'src/app/shared/models';

@Component({
  selector: 'app-blog-item[blogItem]',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './blog-item.component.html',
  styleUrls: ['./blog-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogItemComponent {
  @Input() blogItem!: Blog;
}
