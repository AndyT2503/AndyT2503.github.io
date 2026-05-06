import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LucideIconComponent } from '@shared/components';

@Component({
  selector: 'app-general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [LucideIconComponent, NgOptimizedImage],
})
export class GeneralInfoComponent {
  scrollToSection(id: string): void {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth' });
  }
}
