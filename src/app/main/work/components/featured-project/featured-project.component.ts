import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ProjectData } from '@shared/models';
import { BreakPointService } from '@shared/services';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';

@Component({
  selector: 'app-featured-project',
  templateUrl: './featured-project.component.html',
  styleUrls: ['./featured-project.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgClass, NzTooltipModule, NzIconModule],
})
export class FeaturedProjectComponent {
  @Input({ required: true }) projectData!: ProjectData;
  @Input() position: 'left' | 'right' = 'left';
  readonly isMobile = toSignal(inject(BreakPointService).isMobile$);

  openLinkInNewTab(url: string): void {
    window.open(url, '_blank');
  }
}
