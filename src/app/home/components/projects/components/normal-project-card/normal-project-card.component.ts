import {
  ChangeDetectionStrategy,
  Component,
  input,
  Input,
} from '@angular/core';
import { LucideIconComponent } from '@shared/components';
import { TooltipDirective } from '@shared/directives/tooltip.directive';
import { ProjectData } from '@shared/models';

@Component({
  selector: 'app-normal-project-card',
  templateUrl: './normal-project-card.component.html',
  styleUrls: ['./normal-project-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [LucideIconComponent, TooltipDirective],
})
export class NormalProjectCardComponent {
  readonly project = input.required<ProjectData>();

  getGithubUrl(project: ProjectData): string | null {
    return project.repoUrls?.[0]?.url ?? null;
  }
}
