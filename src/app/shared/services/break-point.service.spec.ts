import { TestBed } from '@angular/core/testing';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { of } from 'rxjs';

import { BreakPointService } from './break-point.service';

describe('BreakPointService', () => {
  it('maps BreakpointObserver.matches to isMobile$', async () => {
    const observe = vi.fn(() =>
      of<BreakpointState>({ matches: true, breakpoints: {} }),
    );

    TestBed.configureTestingModule({
      providers: [
        BreakPointService,
        { provide: BreakpointObserver, useValue: { observe } },
      ],
    });

    const service = TestBed.inject(BreakPointService);

    const value = await new Promise<boolean>((resolve) =>
      service.isMobile$.subscribe(resolve),
    );

    expect(observe).toHaveBeenCalledWith(['(max-width: 768px)']);
    expect(value).toBe(true);
  });
});

