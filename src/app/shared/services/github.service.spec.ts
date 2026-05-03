import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { GithubService } from './github.service';
import { provideAppConfig } from '../config/config.di';

describe('GithubService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GithubService,
        provideHttpClient(),
        provideHttpClientTesting(),
        provideAppConfig({
          repoName: 'repo',
          sourceControlApi: 'https://api.example.com/repos/',
          sourceControlUrl: 'https://example.com/',
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

