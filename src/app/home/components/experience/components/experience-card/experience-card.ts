import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { LucideIconComponent } from '@shared/components';
import { WorkExperience } from '@shared/models';

@Component({
  selector: 'app-experience-card',
  imports: [LucideIconComponent],
  templateUrl: './experience-card.html',
  styleUrl: './experience-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperienceCardComponent {
  readonly experience = input.required<WorkExperience>();
}
