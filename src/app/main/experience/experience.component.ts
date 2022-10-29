import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { LIST_WORK_EXPERIENCE } from 'src/app/shared/data';
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
  readonly listWorkExperience = LIST_WORK_EXPERIENCE;
  readonly trackByIndex = trackByIndex();
}
