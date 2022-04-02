import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { BreakPointService } from 'src/app/shared/services';
import { ProjectData } from '../../model/project.model';

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
