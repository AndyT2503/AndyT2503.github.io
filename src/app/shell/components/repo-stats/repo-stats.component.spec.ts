import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { RepoStatsComponent } from './repo-stats.component';
import { provideEnvironment } from '@shared/providers';
import { GithubService } from '@shared/services';

describe('RepoStatsComponent', () => {
  it('loads repo stats and toggles visibility and expansion state', async () => {
    const githubService = {
      getRepoInfo: vi.fn(() =>
        of({
          stargazers_count: 12,
          forks_count: 3,
        }),
      ),
    };
    vi.spyOn(window, 'scrollY', 'get').mockReturnValue(301);

    TestBed.overrideComponent(RepoStatsComponent, { set: { template: '' } });
    TestBed.configureTestingModule({
      imports: [RepoStatsComponent],
      providers: [
        { provide: GithubService, useValue: githubService },
        { provide: PLATFORM_ID, useValue: 'browser' },
        provideEnvironment({
          repoName: 'portfolio',
          sourceControlApi: 'https://api.example.com/repos/',
          sourceControlUrl: 'https://github.com/AndyT2503',
          domainUrl: 'https://example.com',
          isOpenToWork: true,
        }),
      ],
    });

    const fixture = TestBed.createComponent(RepoStatsComponent);
    fixture.componentInstance.ngOnInit();
    await fixture.whenStable();

    expect(githubService.getRepoInfo).toHaveBeenCalledWith('portfolio');
    expect(fixture.componentInstance.repo()).toEqual({
      stars: 12,
      forks: 3,
      url: 'https://github.com/AndyT2503/portfolio',
    });
    expect(fixture.componentInstance.isVisible()).toBe(true);

    fixture.componentInstance.expandDesktop();
    fixture.componentInstance.toggleMobile();
    await fixture.whenStable();

    expect(fixture.componentInstance.isDesktopExpanded()).toBe(true);
    expect(fixture.componentInstance.isMobileExpanded()).toBe(true);

    fixture.componentInstance.collapseDesktop();
    fixture.componentInstance.closeMobile();
    await fixture.whenStable();

    expect(fixture.componentInstance.isDesktopExpanded()).toBe(false);
    expect(fixture.componentInstance.isMobileExpanded()).toBe(false);
  });
});
