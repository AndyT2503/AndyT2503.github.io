
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { DataService } from '@shared/services';
import { LucideIconComponent } from '@shared/components';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [LucideIconComponent],
})
export class ExperienceComponent {
  readonly listWorkExperience = toSignal(
    inject(DataService).getWorkExperienceData()
  );
}
