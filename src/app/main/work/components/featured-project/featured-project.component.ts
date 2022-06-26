import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { ProjectData } from 'src/app/shared/models';
import { BreakPointService } from 'src/app/shared/services';

@Component({
  selector: 'app-featured-project',
  templateUrl: './featured-project.component.html',
  styleUrls: ['./featured-project.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, NzToolTipModule],
})
export class FeaturedProjectComponent {
  @Input() projectData!: ProjectData;
  @Input() position: 'left' | 'right' = 'left';
  private readonly breakPointService = inject(BreakPointService);
  isMobile$ = this.breakPointService.isMobile$;

  openRepo(url: string): void {
    window.open(url, '_blank');
  }
}
