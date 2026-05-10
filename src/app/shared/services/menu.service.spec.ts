import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';

import { MenuService } from './menu.service';

describe('MenuService', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('updates the active section directly', () => {
    TestBed.configureTestingModule({ providers: [MenuService] });

    const service = TestBed.inject(MenuService);
    service.setActiveSection('projects');

    expect(service.activeSection()).toBe('projects');
  });

  it('scrolls to a section and clears auto scrolling after the delay', () => {
    const section = document.createElement('section');
    section.id = 'projects';
    Object.defineProperty(section, 'offsetTop', { value: 480 });
    document.body.appendChild(section);
    const scrollTo = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    const replaceState = vi
      .spyOn(window.history, 'replaceState')
      .mockImplementation(() => {});

    TestBed.configureTestingModule({ providers: [MenuService] });

    const service = TestBed.inject(MenuService);
    service.scrollToSection('projects');

    expect(service.activeSection()).toBe('projects');
    expect(service.isAutoScrolling()).toBe(true);
    expect(replaceState).toHaveBeenCalledWith(null, '', '/#projects');
    expect(scrollTo).toHaveBeenCalledWith({
      top: 480,
      behavior: 'smooth',
    });

    vi.advanceTimersByTime(1200);

    expect(service.isAutoScrolling()).toBe(false);
    section.remove();
  });

  it('does nothing when the target element does not exist', () => {
    const documentMock = {
      ...document,
      getElementById: vi.fn(() => null),
    } as unknown as Document;
    const scrollTo = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});

    TestBed.configureTestingModule({
      providers: [
        MenuService,
        { provide: DOCUMENT, useValue: documentMock },
      ],
    });

    const service = TestBed.inject(MenuService);
    service.scrollToSection('missing');

    expect(service.activeSection()).toBe('');
    expect(scrollTo).not.toHaveBeenCalled();
  });
});
