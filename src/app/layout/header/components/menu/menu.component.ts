import { NgClass, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { DrawerComponent } from 'src/app/shared/components';
import { MENU } from 'src/app/shared/data';
import { BreakPointService, MenuService } from 'src/app/shared/services';
import { trackByIndex } from 'src/app/shared/utils';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgClass, NgIf, DrawerComponent, NzIconModule, NgFor, NgTemplateOutlet],
})
export class MenuComponent {
  private readonly breakPointService = inject(BreakPointService);
  private readonly menuService = inject(MenuService);
  readonly isMobile = toSignal(this.breakPointService.isMobile$);
  readonly currentMenuSelected = this.menuService.getCurrentMenuSelected();
  readonly listMenu = MENU;
  readonly trackByIndex = trackByIndex();
  isOpenDrawerMenu = false;


  onClickMenu(): void {
    if (this.isMobile()) {
      this.isOpenDrawerMenu = false;
    }
  }

  openResume(): void {
    window.open(
      'https://www.topcv.vn/xem-cv/UFRTAgIEAlQDBVRdX1BTA1MFBlFXV1MLAFJUAAcf99',
      '_blank'
    );
  }
}
