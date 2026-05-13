import { IMAGE_LOADER, ImageLoaderConfig, NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import { LucideIconComponent } from '@shared/components';
import { injectEnvironment } from '@shared/providers';
import { MenuService } from '@shared/services/menu.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [LucideIconComponent, NgOptimizedImage],
  providers: [
    {
      provide: IMAGE_LOADER,
      useValue: (config: ImageLoaderConfig) => {
        if (config.width) {
          return config.src.replace(/avatar-\d+\.webp$/, `avatar-${config.width}.webp`);
        }
        return config.src;
      },
    },
  ],
})
export class IntroComponent {
  private readonly menuService = inject(MenuService);
  readonly isOpenToWork = injectEnvironment().isOpenToWork;

  scrollToSection(id: string): void {
    this.menuService.scrollToSection(id);
  }
}
