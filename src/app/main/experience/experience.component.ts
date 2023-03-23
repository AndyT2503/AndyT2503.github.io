import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { DataService } from 'src/app/shared/services';
import { trackByIndex } from 'src/app/shared/utils';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, NzTabsModule],
})
export class ExperienceComponent {
  readonly listWorkExperience$ = inject(DataService).getWorkExperienceData();
  readonly trackByIndex = trackByIndex();
}
