import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LucideIconComponent } from '@shared/components';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [LucideIconComponent],
})
export class AboutComponent {
  readonly techs = ['Angular', 'TypeScript', '.NET Core', 'NestJS', 'Playwright'] as const;
  readonly interests = [
    { label: 'Badminton 🏸' },
    { label: 'Basketball 🏀' },
    { label: 'Side Projects 💻' },
    { label: 'Tech Blogging ✍️' },
  ] as const;
}
