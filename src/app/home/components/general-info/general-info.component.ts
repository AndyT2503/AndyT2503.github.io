import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { LucideIconComponent } from '@shared/components';
import { MenuService } from '@shared/services/menu.service';

@Component({
  selector: 'app-general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [LucideIconComponent, NgOptimizedImage],
})
export class GeneralInfoComponent {
  private readonly menuService = inject(MenuService);

  scrollToSection(id: string): void {
    this.menuService.scrollToSection(id);
  }
}
