import { NzIconModule } from 'ng-zorro-antd/icon';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { ProjectData } from 'src/app/shared/models';
import { trackByIndex } from 'src/app/shared/utils';

@Component({
  selector: 'app-normal-project',
  templateUrl: './normal-project.component.html',
  styleUrls: ['./normal-project.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, NzToolTipModule, NzIconModule],
})
export class NormalProjectComponent {
  @Input() projectData!: ProjectData;
  readonly trackByIndex = trackByIndex;
  openRepo(url: string): void {
    window.open(url, '_blank');
  }
}
