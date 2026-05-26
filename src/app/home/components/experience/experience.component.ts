import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { DataService } from '@shared/services';
import { ExperienceCardComponent } from './components/experience-card/experience-card';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ExperienceCardComponent],
})
export class ExperienceComponent {
  private readonly dataService = inject(DataService);
  readonly listWorkExperience = rxResource({
    stream: () => this.dataService.getWorkExperienceData(),
    defaultValue: [],
  });
}
