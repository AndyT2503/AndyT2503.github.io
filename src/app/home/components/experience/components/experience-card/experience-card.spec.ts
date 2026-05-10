import { TestBed } from '@angular/core/testing';

import { ExperienceCardComponent } from './experience-card';
import { WorkExperience } from '@shared/models';

describe('ExperienceCardComponent', () => {
  it('renders the provided work experience', async () => {
    const experience: WorkExperience = {
      companyName: 'Acme',
      role: 'Frontend Engineer',
      time: '2024 - 2026',
      jobDetails: ['Built Angular apps', 'Improved performance'],
      url: 'https://example.com',
    };

    TestBed.configureTestingModule({ imports: [ExperienceCardComponent] });

    const fixture = TestBed.createComponent(ExperienceCardComponent);
    fixture.componentRef.setInput('experience', experience);
    await fixture.whenStable();

    const text = fixture.nativeElement.textContent as string;
    const link = fixture.nativeElement.querySelector('a') as HTMLAnchorElement;
    expect(text).toContain('Frontend Engineer');
    expect(text).toContain('Acme');
    expect(text).toContain('Built Angular apps');
    expect(link.getAttribute('href')).toBe('https://example.com');
  });
});
