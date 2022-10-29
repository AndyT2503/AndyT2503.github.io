import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FEATURED_PROJECTS, NORMAL_PROJECTS } from 'src/app/shared/data';
import { ProjectData } from 'src/app/shared/models';
import { trackByIndex, trackByProp } from 'src/app/shared/utils';
import { FeaturedProjectComponent } from './components/featured-project/featured-project.component';
import { NormalProjectComponent } from './components/normal-project/normal-project.component';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, FeaturedProjectComponent, NormalProjectComponent],
})
export class WorkComponent {
  readonly listFeaturedProject = FEATURED_PROJECTS;
  readonly listOtherProject = NORMAL_PROJECTS;
  readonly trackByProjectName = trackByProp<ProjectData>('name');
}
