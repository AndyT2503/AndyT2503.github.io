import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { WorkComponent } from './work.component';
import { DataService } from '@shared/services';
import { ProjectData } from '@shared/models';

describe('WorkComponent', () => {
  it('exposes featured and other projects as signals', async () => {
    const featured: ProjectData[] = [];
    const normal: ProjectData[] = [];

    TestBed.overrideComponent(WorkComponent, { set: { template: '' } });
    TestBed.configureTestingModule({
      imports: [WorkComponent],
      providers: [
        {
          provide: DataService,
          useValue: {
            getFeaturedProjectData: vi.fn(() => of(featured)),
            getNormalProjectData: vi.fn(() => of(normal)),
          },
        },
      ],
    });

    const fixture = TestBed.createComponent(WorkComponent);
    await fixture.whenStable();

    expect(fixture.componentInstance.listFeaturedProject()).toEqual(featured);
    expect(fixture.componentInstance.listOtherProject()).toEqual(normal);
  });
});
