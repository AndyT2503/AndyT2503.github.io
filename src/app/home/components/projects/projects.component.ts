import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { LucideIconComponent } from '@shared/components';
import { DataService } from '@shared/services';
import { FeaturedProjectCardComponent } from './components/featured-project-card/featured-project-card.component';
import { NormalProjectCardComponent } from './components/normal-project-card/normal-project-card.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [FeaturedProjectCardComponent, NormalProjectCardComponent, LucideIconComponent],
})
export class ProjectsComponent {
  private readonly dataService = inject(DataService);

  readonly featuredProjects = rxResource({
    stream: () => this.dataService.getFeaturedProjectData(),
    defaultValue: [],
  });
  readonly normalProjects = rxResource({
    stream: () => this.dataService.getNormalProjectData(),
    defaultValue: [],
  });

  getGradientByIndex(index: number): string {
    if (index % 3 === 0) return 'pink-orange';
    if (index % 3 === 1) return 'purple-blue';
    return 'orange-yellow';
  }
}
