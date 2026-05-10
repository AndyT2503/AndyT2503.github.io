import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { GithubService } from './github.service';
import { provideEnvironment } from '@shared/providers';

describe('GithubService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GithubService,
        provideHttpClient(),
        provideHttpClientTesting(),
        provideEnvironment({
          repoName: 'repo',
          sourceControlApi: 'https://api.example.com/repos/',
          sourceControlUrl: 'https://example.com/',
          domainUrl: 'https://example.com',
          isOpenToWork: true,
        }),
      ],
    });
  });

  afterEach(() => {
    TestBed.inject(HttpTestingController).verify();
  });

  it('requests repo info from configured API base', () => {
    const service = TestBed.inject(GithubService);
    const httpMock = TestBed.inject(HttpTestingController);

    service.getRepoInfo('my-repo').subscribe();

    const req = httpMock.expectOne('https://api.example.com/repos/my-repo');
    expect(req.request.method).toBe('GET');
    req.flush({} as any);
  });
});

