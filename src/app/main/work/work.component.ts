import { CommonModule, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ProjectData } from 'src/app/shared/models';
import { DataService } from 'src/app/shared/services';
import { trackByProp } from 'src/app/shared/utils';
import { FeaturedProjectComponent } from './components/featured-project/featured-project.component';
import { NormalProjectComponent } from './components/normal-project/normal-project.component';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgFor, FeaturedProjectComponent, NormalProjectComponent],
})
export class WorkComponent {
  private readonly dataService = inject(DataService);
  readonly listFeaturedProject = toSignal(this.dataService.getFeaturedProjectData());
  readonly listOtherProject = toSignal(this.dataService.getNormalProjectData());
  readonly trackByProjectName = trackByProp<ProjectData>('name');
}
