
import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { DataService } from '@shared/services';
import { LucideIconComponent } from '@shared/components';
import { ProjectData } from '@shared/models';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [LucideIconComponent, NgClass],
})
export class WorkComponent {
  private readonly dataService = inject(DataService);
  readonly listFeaturedProject = toSignal(this.dataService.getFeaturedProjectData());
  readonly listOtherProject = toSignal(this.dataService.getNormalProjectData());

  getGradientByIndex(index: number): string {
    if (index % 3 === 0) return 'pink-orange';
    if (index % 3 === 1) return 'purple-blue';
    return 'orange-yellow';
  }

  getGithubUrl(project: ProjectData): string | null {
    const url = project.repoUrls?.[0]?.url;
    return url ?? null;
  }
}
