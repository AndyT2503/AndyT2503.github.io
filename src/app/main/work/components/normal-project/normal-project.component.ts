import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { ProjectData } from 'src/app/shared/models';
import { trackByIndex } from 'src/app/shared/utils';

@Component({
  selector: 'app-normal-project',
  templateUrl: './normal-project.component.html',
  styleUrls: ['./normal-project.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgFor, NzToolTipModule, NzIconModule],
})
export class NormalProjectComponent {
  @Input({required: true}) projectData!: ProjectData;
  readonly trackByIndex = trackByIndex();
  openRepo(url: string): void {
    window.open(url, '_blank');
  }
}
