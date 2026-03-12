import { NgClass, NgTemplateOutlet } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  QueryList,
  Renderer2,
  ViewChildren,
  inject,
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { DrawerComponent } from 'src/app/shared/components';
import { MENU } from 'src/app/shared/data';
import { Menu } from 'src/app/shared/models';
import { BreakPointService, MenuService } from 'src/app/shared/services';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgClass, DrawerComponent, NzIconModule, NgTemplateOutlet],
})
export class MenuComponent implements AfterViewInit {
  @ViewChildren('menuItem') menuItems!: QueryList<ElementRef<HTMLLinkElement>>;
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly breakPointService = inject(BreakPointService);
  private readonly menuService = inject(MenuService);
  private readonly renderer = inject(Renderer2);
  readonly isMobile = toSignal(this.breakPointService.isMobile$);
  readonly listMenu = MENU;
  isOpenDrawerMenu = false;

  ngAfterViewInit(): void {
    this.checkActiveMenu();
  }

  private checkActiveMenu(): void {
    this.menuService
      .getCurrentMenuSelected()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((menu) => {
        this.menuItems.forEach((item) => {
          this.renderer.removeClass(item.nativeElement, 'active');
        });
        const activeMenu = this.menuItems.find(
          (item) => item.nativeElement.innerText === menu,
        );
        if (activeMenu) {
          this.renderer.addClass(activeMenu.nativeElement, 'active');
        }
      });
  }

  onClickMenu(menuItem: Menu): void {
    if (this.isMobile()) {
      this.isOpenDrawerMenu = false;
    }
    this.router.navigate(['/'], { fragment: menuItem.fragment });
  }

  openResume(): void {
    window.open(
      'assets/cv/cv.pdf',
      '_blank',
    );
  }
}
