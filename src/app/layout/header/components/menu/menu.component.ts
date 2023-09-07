import { NgClass, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  QueryList,
  Renderer2,
  ViewChildren,
  effect,
  inject,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { takeUntil } from 'rxjs';
import { DrawerComponent } from 'src/app/shared/components';
import { MENU } from 'src/app/shared/data';
import {
  BreakPointService,
  DestroyService,
  MenuService,
} from 'src/app/shared/services';
import { trackByIndex } from 'src/app/shared/utils';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgClass,
    NgIf,
    DrawerComponent,
    NzIconModule,
    NgFor,
    NgTemplateOutlet,
  ],
  providers: [DestroyService],
})
export class MenuComponent implements AfterViewInit {
  @ViewChildren('menuItem') menuItems!: QueryList<ElementRef<HTMLLinkElement>>;
  private readonly breakPointService = inject(BreakPointService);
  private readonly menuService = inject(MenuService);
  private readonly destroyed$ = inject(DestroyService);
  private readonly renderer = inject(Renderer2);
  readonly isMobile = toSignal(this.breakPointService.isMobile$);
  readonly listMenu = MENU;
  readonly trackByIndex = trackByIndex();
  isOpenDrawerMenu = false;

  ngAfterViewInit(): void {
    this.checkActiveMenu();
  }

  private checkActiveMenu(): void {
    this.menuService
      .getCurrentMenuSelected()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((menu) => {
        this.menuItems.forEach((item) => {
          this.renderer.removeClass(item.nativeElement, 'active');
        });
        const activeMenu = this.menuItems.find(
          (item) => item.nativeElement.innerText === menu
        );
        if (activeMenu) {
          this.renderer.addClass(activeMenu.nativeElement, 'active');
        }
      });
  }

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
