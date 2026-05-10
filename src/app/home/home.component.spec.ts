import { DOCUMENT } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { HomeComponent } from './home.component';
import { MenuService } from '@shared/services/menu.service';
import { SeoService } from '@shared/services/seo.service';

describe('HomeComponent', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('applies home SEO and defaults the home hash to intro', async () => {
    const menuService = {
      activeSection: vi.fn(() => ''),
      isAutoScrolling: vi.fn(() => false),
      setActiveSection: vi.fn(),
    };
    const seoService = { applyHome: vi.fn() };
    const replaceState = vi
      .spyOn(window.history, 'replaceState')
      .mockImplementation(() => {});

    TestBed.overrideComponent(HomeComponent, { set: { template: '' } });
    TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        { provide: Router, useValue: { url: '/' } },
        { provide: MenuService, useValue: menuService },
        { provide: SeoService, useValue: seoService },
        { provide: PLATFORM_ID, useValue: 'browser' },
      ],
    });

    const fixture = TestBed.createComponent(HomeComponent);
    fixture.componentInstance.ngAfterViewInit();
    await fixture.whenStable();

    expect(seoService.applyHome).toHaveBeenCalled();
    expect(menuService.setActiveSection).toHaveBeenCalledWith('intro');
    expect(replaceState).toHaveBeenCalledWith(null, '', '/#intro');
  });

  it('updates the active section and URL on scroll', async () => {
    const listeners = new Map<string, EventListener>();
    const scrollTopSpy = vi
      .spyOn(document.documentElement, 'scrollTop', 'get')
      .mockReturnValue(350);
    const clientHeightSpy = vi
      .spyOn(document.documentElement, 'clientHeight', 'get')
      .mockReturnValue(300);
    const addEventListenerSpy = vi
      .spyOn(document, 'addEventListener')
      .mockImplementation((event, listener) => {
        listeners.set(event, listener as EventListener);
      });
    const menuService = {
      activeSection: vi.fn(() => 'intro'),
      isAutoScrolling: vi.fn(() => false),
      setActiveSection: vi.fn(),
    };
    const replaceState = vi
      .spyOn(window.history, 'replaceState')
      .mockImplementation(() => {});
    const rafSpy = vi
      .spyOn(window, 'requestAnimationFrame')
      .mockImplementation((callback: FrameRequestCallback) => {
        callback(0);
        return 1;
      });

    TestBed.overrideComponent(HomeComponent, { set: { template: '' } });
    TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        { provide: Router, useValue: { url: '/' } },
        { provide: MenuService, useValue: menuService },
        { provide: SeoService, useValue: { applyHome: vi.fn() } },
        { provide: PLATFORM_ID, useValue: 'browser' },
      ],
    });

    const fixture = TestBed.createComponent(HomeComponent);
    const getElementByIdSpy = vi
      .spyOn(document, 'getElementById')
      .mockImplementation((id: string) => {
        const offsets: Record<string, number> = {
          intro: 0,
          about: 200,
          experience: 400,
          projects: 800,
          blog: 1200,
          contact: 1600,
        };
        return { offsetTop: offsets[id] } as HTMLElement;
      });
    fixture.componentInstance.ngAfterViewInit();
    listeners.get('scroll')?.(new Event('scroll'));
    await fixture.whenStable();

    expect(rafSpy).toHaveBeenCalled();
    expect(menuService.setActiveSection).toHaveBeenCalledWith('experience');
    expect(replaceState).toHaveBeenCalledWith(null, '', '/#experience');
    expect(getElementByIdSpy).toHaveBeenCalledWith('experience');
    expect(addEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function), {
      passive: true,
    });
    scrollTopSpy.mockRestore();
    clientHeightSpy.mockRestore();
  });
});
