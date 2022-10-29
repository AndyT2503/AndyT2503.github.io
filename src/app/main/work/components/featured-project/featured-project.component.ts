import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { map, tap } from 'rxjs';
import { ProjectData } from 'src/app/shared/models';
import { BreakPointService } from 'src/app/shared/services';
import { trackByIndex } from 'src/app/shared/utils';

@Component({
  selector: 'app-featured-project',
  templateUrl: './featured-project.component.html',
  styleUrls: ['./featured-project.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, NzToolTipModule, NzIconModule],
})
export class FeaturedProjectComponent {
  @Input() projectData!: ProjectData;
  @Input() position: 'left' | 'right' = 'left';
  private readonly breakPointService = inject(BreakPointService);
  readonly trackByIndex = trackByIndex;
  isMobile = false;
  isScreenResize$ = this.breakPointService.isMobile$.pipe(
    tap((isMobile) => (this.isMobile = isMobile)),
    map((_) => true)
  );

  openLinkInNewTab(url: string): void {
    window.open(url, '_blank');
  }
}
