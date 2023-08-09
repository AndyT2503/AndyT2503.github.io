import { NgClass, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { ProjectData } from 'src/app/shared/models';
import { BreakPointService } from 'src/app/shared/services';
import { trackByIndex } from 'src/app/shared/utils';

@Component({
  selector: 'app-featured-project',
  templateUrl: './featured-project.component.html',
  styleUrls: ['./featured-project.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgClass, NgFor, NzToolTipModule, NzIconModule, NgIf],
})
export class FeaturedProjectComponent {
  @Input({ required: true }) projectData!: ProjectData;
  @Input() position: 'left' | 'right' = 'left';
  readonly trackByIndex = trackByIndex();
  readonly isMobile = toSignal(inject(BreakPointService).isMobile$);

  openLinkInNewTab(url: string): void {
    window.open(url, '_blank');
  }
}
