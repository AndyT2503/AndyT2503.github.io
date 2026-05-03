import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { FeaturedProjectComponent } from './featured-project.component';
import { BreakPointService } from '@shared/services';
import { ProjectData } from '@shared/models';

describe('FeaturedProjectComponent', () => {
  it('opens a link in a new tab', () => {
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null as any);

    TestBed.overrideComponent(FeaturedProjectComponent, { set: { template: '' } });
    TestBed.configureTestingModule({
      imports: [FeaturedProjectComponent],
      providers: [{ provide: BreakPointService, useValue: { isMobile$: of(false) } }],
    });

    const fixture = TestBed.createComponent(FeaturedProjectComponent);
    fixture.componentInstance.projectData = {} as ProjectData;

    fixture.componentInstance.openLinkInNewTab('https://example.com');
    expect(openSpy).toHaveBeenCalledWith('https://example.com', '_blank');

    openSpy.mockRestore();
  });
});
