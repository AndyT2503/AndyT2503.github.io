import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { FooterComponent } from './footer.component';
import { GithubService } from '@shared/services';
import { provideAppConfig } from '@shared/config/config.di';

describe('FooterComponent', () => {
  it('builds repoUrl from AppConfig and exposes repoInfo as a signal', async () => {
    TestBed.overrideComponent(FooterComponent, { set: { template: '' } });
    TestBed.configureTestingModule({
      imports: [FooterComponent],
      providers: [
        { provide: GithubService, useValue: { getRepoInfo: vi.fn(() => of({ stars: 1 })) } },
        provideAppConfig({
          repoName: 'my-repo',
          sourceControlApi: 'https://api.example.com/',
          sourceControlUrl: 'https://example.com/',
        }),
      ],
    });

    const fixture = TestBed.createComponent(FooterComponent);
    await fixture.whenStable();

    expect(fixture.componentInstance.repoUrl).toBe('https://example.com/my-repo');
    expect(fixture.componentInstance.repoInfo()).toEqual({ stars: 1 });
  });
});
