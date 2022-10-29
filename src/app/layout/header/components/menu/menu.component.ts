import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnDestroy,
  OnInit
} from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Subject, takeUntil } from 'rxjs';
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
  imports: [CommonModule, DrawerComponent, NzIconModule],
})
export class MenuComponent implements OnInit, OnDestroy {
  private readonly breakPointService = inject(BreakPointService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly menuService = inject(MenuService);
  isMobile!: boolean;
  isOpenDrawerMenu = false;
  destroyed$ = new Subject<void>();

  readonly currentMenuSelected$ = this.menuService.getCurrentMenuSelected();
  readonly listMenu = MENU;
  readonly trackByIndex = trackByIndex;

  ngOnInit(): void {
    this.detectViewSizeChange();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  onClickMenu(): void {
    if (this.isMobile) {
      this.isOpenDrawerMenu = false;
    }
  }

  detectViewSizeChange(): void {
    this.breakPointService.isMobile$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((isMobile) => {
        this.isMobile = isMobile;
        this.cdr.markForCheck();
      });
  }

  openResume(): void {
    window.open(
      'https://www.topcv.vn/xem-cv/UFRTAgIEAlQDBVRdX1BTA1MFBlFXV1MLAFJUAAcf99',
      '_blank'
    );
  }
}
