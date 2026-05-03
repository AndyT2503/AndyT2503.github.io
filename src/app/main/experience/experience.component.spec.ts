import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ExperienceComponent } from './experience.component';
import { DataService } from '@shared/services';
import { WorkExperience } from '@shared/models';

describe('ExperienceComponent', () => {
  it('exposes work experience list as a signal', async () => {
    const work: WorkExperience[] = [];

    TestBed.overrideComponent(ExperienceComponent, { set: { template: '' } });
    TestBed.configureTestingModule({
      imports: [ExperienceComponent],
      providers: [{ provide: DataService, useValue: { getWorkExperienceData: vi.fn(() => of(work)) } }],
    });

    const fixture = TestBed.createComponent(ExperienceComponent);
    await fixture.whenStable();

    expect(fixture.componentInstance.listWorkExperience()).toEqual(work);
  });
});
