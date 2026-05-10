import { TestBed } from '@angular/core/testing';

import { NormalProjectCardComponent } from './normal-project-card.component';
import { ProjectData } from '@shared/models';

describe('NormalProjectCardComponent', () => {
  it('renders the normal project and exposes the first GitHub URL', async () => {
    const project: ProjectData = {
      name: 'Library',
      description: 'Reusable utilities',
      repoUrls: [{ tooltip: 'GitHub', url: 'https://github.com/example/lib' }],
      tech: ['TypeScript'],
    };

    TestBed.configureTestingModule({ imports: [NormalProjectCardComponent] });

    const fixture = TestBed.createComponent(NormalProjectCardComponent);
    fixture.componentRef.setInput('project', project);
    await fixture.whenStable();

    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('Library');
    expect(text).toContain('Reusable utilities');
    expect(fixture.componentInstance.getGithubUrl(project)).toBe(
      'https://github.com/example/lib',
    );
  });

  it('returns null when a project has no repository URLs', async () => {
    const project: ProjectData = {
      name: 'Library',
      description: 'Reusable utilities',
      repoUrls: [],
      tech: ['TypeScript'],
    };

    TestBed.overrideComponent(NormalProjectCardComponent, {
      set: { template: '' },
    });
    TestBed.configureTestingModule({ imports: [NormalProjectCardComponent] });

    const fixture = TestBed.createComponent(NormalProjectCardComponent);
    fixture.componentRef.setInput('project', project);
    await fixture.whenStable();

    expect(fixture.componentInstance.getGithubUrl(project)).toBeNull();
  });
});
