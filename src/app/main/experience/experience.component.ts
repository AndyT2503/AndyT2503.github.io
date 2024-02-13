
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { DataService } from 'src/app/shared/services';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NzTabsModule],
})
export class ExperienceComponent {
  readonly listWorkExperience = toSignal(
    inject(DataService).getWorkExperienceData()
  );
}
