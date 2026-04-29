import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ProjectData } from '@shared/models';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';
@Component({
  selector: 'app-normal-project',
  templateUrl: './normal-project.component.html',
  styleUrls: ['./normal-project.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NzTooltipModule, NzIconModule],
})
export class NormalProjectComponent {
  @Input({required: true}) projectData!: ProjectData;
  openRepo(url: string): void {
    window.open(url, '_blank');
  }
}
