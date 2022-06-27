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
import { BreakPointService, MenuService } from 'src/app/shared/services';

interface MenuItem {
  name: string;
  link: string;
}

export const appMenuList = [
  {
    name: 'About',
    link: '#about',
  },
  {
    name: 'Experience',
    link: '#experience',
  },
  {
    name: 'Work',
    link: '#work',
  },
  {
    name: 'Contact',
    link: '#contact',
  },
];

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
  readonly listMenu: ReadonlyArray<MenuItem> = appMenuList;

  ngOnInit(): void {
    this.detectViewSizeChange();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  onClickMenu(): void {
    this.isOpenDrawerMenu = false;
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
      'https://www.topcv.vn/xem-cv/B1YAUANXAVMEVVcBDwAACw0CUAhfCwtUAVFbAQ9044',
      '_blank'
    );
  }
}
