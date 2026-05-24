import {
  IMAGE_LOADER,
  ImageLoaderConfig,
  NgOptimizedImage,
} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Blog } from '@shared/models';
import { LucideIconComponent } from '@shared/components';

@Component({
  selector: 'app-blog-item',
  standalone: true,
  imports: [RouterLink, LucideIconComponent, NgOptimizedImage],
  templateUrl: './blog-item.component.html',
  styleUrls: ['./blog-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: IMAGE_LOADER,
      useValue: (config: ImageLoaderConfig) => {
        if (config.width) {
          return config.src.replace(/default(?:-\d+)?\.jpg$/, `default-${config.width}.jpg`);
        }
        return config.src;
      },
    },
  ],
})
export class BlogItemComponent {
  readonly blogItem = input.required<Blog>();

  readonly thumbnailUrl = computed(() => {
    const slug = this.blogItem().slug;
    return `content/images/${slug}/default.jpg`;
  });
}
