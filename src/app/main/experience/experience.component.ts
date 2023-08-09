import { CommonModule, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { DataService } from 'src/app/shared/services';
import { trackByIndex } from 'src/app/shared/utils';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgFor, NzTabsModule],
})
export class ExperienceComponent {
  readonly listWorkExperience = toSignal(
    inject(DataService).getWorkExperienceData()
  );
  readonly trackByIndex = trackByIndex();
}
