import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ProjectsComponent } from './projects.component';
import { DataService } from '@shared/services';
import { ProjectData } from '@shared/models';

describe('ProjectsComponent', () => {
  const featuredProject: ProjectData = {
    name: 'Featured',
    description: 'Featured project',
    repoUrls: [],
    tech: ['Angular'],
  };
  const normalProject: ProjectData = {
    name: 'Normal',
    description: 'Normal project',
    repoUrls: [],
    tech: ['TypeScript'],
  };

  it('loads featured and normal project data as signals', async () => {
    const dataService = {
      getFeaturedProjectData: vi.fn(() => of([featuredProject])),
      getNormalProjectData: vi.fn(() => of([normalProject])),
    };

    TestBed.overrideComponent(ProjectsComponent, { set: { template: '' } });
    TestBed.configureTestingModule({
      imports: [ProjectsComponent],
      providers: [{ provide: DataService, useValue: dataService }],
    });

    const fixture = TestBed.createComponent(ProjectsComponent);
    await fixture.whenStable();

    expect(fixture.componentInstance.featuredProjects()).toEqual([
      featuredProject,
    ]);
    expect(fixture.componentInstance.normalProjects()).toEqual([normalProject]);
  });

  it('cycles project gradients by index', async () => {
    const dataService = {
      getFeaturedProjectData: vi.fn(() => of([])),
      getNormalProjectData: vi.fn(() => of([])),
    };

    TestBed.overrideComponent(ProjectsComponent, { set: { template: '' } });
    TestBed.configureTestingModule({
      imports: [ProjectsComponent],
      providers: [{ provide: DataService, useValue: dataService }],
    });

    const fixture = TestBed.createComponent(ProjectsComponent);
    await fixture.whenStable();

    expect(fixture.componentInstance.getGradientByIndex(0)).toBe('pink-orange');
    expect(fixture.componentInstance.getGradientByIndex(1)).toBe('purple-blue');
    expect(fixture.componentInstance.getGradientByIndex(2)).toBe('orange-yellow');
    expect(fixture.componentInstance.getGradientByIndex(3)).toBe('pink-orange');
  });
});
