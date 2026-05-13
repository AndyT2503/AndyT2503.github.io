import {
  ChangeDetectionStrategy,
  Component,
  input,
} from '@angular/core';
import { LucideIconComponent } from '@shared/components/lucide-icon/lucide-icon.component';
import { Blog } from '@shared/models';

@Component({
  selector: 'app-blog-header-card',
  imports: [LucideIconComponent],
  templateUrl: './blog-header-card.component.html',
  styleUrl: './blog-header-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogHeaderCardComponent {
  readonly blog = input.required<Blog>();
}
