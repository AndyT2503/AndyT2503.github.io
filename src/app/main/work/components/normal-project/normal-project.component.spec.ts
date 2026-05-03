import { TestBed } from '@angular/core/testing';

import { NormalProjectComponent } from './normal-project.component';
import { ProjectData } from '@shared/models';

describe('NormalProjectComponent', () => {
  it('opens the repo URL in a new tab', () => {
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null as any);

    TestBed.overrideComponent(NormalProjectComponent, { set: { template: '' } });
    TestBed.configureTestingModule({ imports: [NormalProjectComponent] });
    const fixture = TestBed.createComponent(NormalProjectComponent);
    fixture.componentInstance.projectData = {} as ProjectData;

    fixture.componentInstance.openRepo('https://github.com/example/repo');

    expect(openSpy).toHaveBeenCalledWith('https://github.com/example/repo', '_blank');
    openSpy.mockRestore();
  });
});
