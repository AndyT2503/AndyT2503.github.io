import { TestBed } from '@angular/core/testing';

import { FeaturedProjectCardComponent } from './featured-project-card.component';
import { ProjectData } from '@shared/models';

describe('FeaturedProjectCardComponent', () => {
  it('renders the featured project and gradient class', async () => {
    const project: ProjectData = {
      name: 'Portfolio',
      description: 'Personal site',
      repoUrls: [{ tooltip: 'GitHub', url: 'https://github.com/example/repo' }],
      linkDemo: { tooltip: 'Demo', url: 'https://example.com' },
      tech: ['Angular', 'TypeScript'],
    };

    TestBed.configureTestingModule({ imports: [FeaturedProjectCardComponent] });

    const fixture = TestBed.createComponent(FeaturedProjectCardComponent);
    fixture.componentRef.setInput('project', project);
    fixture.componentRef.setInput('gradient', 'pink-orange');
    await fixture.whenStable();

    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('Portfolio');
    expect(text).toContain('Personal site');
    expect(text).toContain('Angular');
    expect(fixture.nativeElement.querySelector('.is-pink-orange')).not.toBeNull();
  });
});
