import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ProjectData } from 'src/app/shared/models';
import { BreakPointService } from 'src/app/shared/services';


@Component({
  selector: 'app-featured-project',
  templateUrl: './featured-project.component.html',
  styleUrls: ['./featured-project.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeaturedProjectComponent {
  @Input() projectData!: ProjectData;
  @Input() position: 'left' | 'right' = 'left';
  isMobile$ = this.breakPointService.isMobile$;
  constructor(
    private readonly breakPointService:  BreakPointService
  ) { }

  openRepo(url: string): void {
    window.open(url, '_blank');
  }

}
