import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { BreakPointService } from 'src/app/shared/services';

interface MenuItem {
  name: string;
  link: string;
} 

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent implements OnInit, OnDestroy {
  isMobile!: boolean;
  isOpenDrawerMenu = false;
  destroyed$ = new Subject<void>();
  readonly listMenu: ReadonlyArray<MenuItem> = [
    {
      name: 'About',
      link: '#about'
    },
    {
      name: 'Experience',
      link: '#experience'
    },
    {
      name: 'Work',
      link: '#work'
    },
    {
      name: 'Contact',
      link: '#contact'
    },
  ];

  selectedMenuItem!: string;
  constructor(
    private breakPointService: BreakPointService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.detectViewSizeChange();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  onClickMenu(item: MenuItem): void {
    this.selectedMenuItem = item.name;
    this.isOpenDrawerMenu = false;
  }

  detectViewSizeChange(): void {
    this.breakPointService.isMobile$.pipe(takeUntil(this.destroyed$)).subscribe(
      (isMobile) => {
        this.isMobile = isMobile;
        this.cdr.markForCheck();
      }
    )
  }

  openResume(): void {
    window.open('https://www.topcv.vn/xem-cv/B1YAUANXAVMEVVcBDwAACw0CUAhfCwtUAVFbAQ9044', '_blank');
  }

}
