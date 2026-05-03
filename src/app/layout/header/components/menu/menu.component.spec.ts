import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { MenuComponent } from './menu.component';
import { BreakPointService, MenuService } from '@shared/services';
import { Router } from '@angular/router';
import { MENU } from '@shared/data';

describe('MenuComponent', () => {
  it('navigates to fragment and closes drawer on mobile', () => {
    const router = { navigate: vi.fn(() => Promise.resolve(true)) };

    TestBed.overrideComponent(MenuComponent, {
      set: {
        template: `
          @for (item of listMenu; track $index) {
            <a #menuItem (click)="onClickMenu(item)">{{ item.name }}</a>
          }
        `,
      },
    });
    TestBed.configureTestingModule({
      imports: [MenuComponent],
      providers: [
        { provide: Router, useValue: router },
        { provide: BreakPointService, useValue: { isMobile$: of(true) } },
      ],
    });

    const fixture = TestBed.createComponent(MenuComponent);
    fixture.componentInstance.isOpenDrawerMenu = true;

    fixture.componentInstance.onClickMenu(MENU[0]);

    expect(fixture.componentInstance.isOpenDrawerMenu).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/'], { fragment: 'about' });
  });

  it('adds the active class when MenuService emits a matching name', async () => {
    TestBed.overrideComponent(MenuComponent, {
      set: {
        template: `
          @for (item of listMenu; track $index) {
            <a #menuItem>{{ item.name }}</a>
          }
        `,
      },
    });
    TestBed.configureTestingModule({
      imports: [MenuComponent],
      providers: [
        { provide: Router, useValue: { navigate: vi.fn(() => Promise.resolve(true)) } },
        { provide: BreakPointService, useValue: { isMobile$: of(false) } },
        MenuService,
      ],
    });

    const fixture = TestBed.createComponent(MenuComponent);
    await fixture.whenStable();

    const anchors = Array.from(fixture.nativeElement.querySelectorAll('a')) as HTMLAnchorElement[];
    for (const a of anchors) {
      if (!('innerText' in a) || a.innerText === '') {
        Object.defineProperty(a, 'innerText', {
          get: () => a.textContent ?? '',
          configurable: true,
        });
      }
    }

    const menuService = TestBed.inject(MenuService);
    fixture.componentInstance.ngAfterViewInit();
    await fixture.whenStable();
    menuService.updateCurrentMenuSelected('Blog');
    await new Promise((r) => setTimeout(r, 0));
    await fixture.whenStable();

    const active = anchors.find((a) => a.classList.contains('active'));
    expect(active?.textContent?.trim()).toBe('Blog');
  });

  it('opens resume in a new tab', () => {
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null as any);

    TestBed.overrideComponent(MenuComponent, { set: { template: '' } });
    TestBed.configureTestingModule({
      imports: [MenuComponent],
      providers: [
        { provide: Router, useValue: { navigate: vi.fn(() => Promise.resolve(true)) } },
        { provide: BreakPointService, useValue: { isMobile$: of(false) } },
      ],
    });
    const fixture = TestBed.createComponent(MenuComponent);

    fixture.componentInstance.openResume();
    expect(openSpy).toHaveBeenCalledWith('assets/cv/cv.pdf', '_blank');

    openSpy.mockRestore();
  });
});
