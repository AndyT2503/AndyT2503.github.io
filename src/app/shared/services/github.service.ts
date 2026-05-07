import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { GithubResponse } from '../models';
import { injectEnvironment } from '@shared/providers';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  private readonly http = inject(HttpClient);
  private readonly appConfig = injectEnvironment();
  getRepoInfo(name: string) {
    return this.http.get<GithubResponse>(
      `${this.appConfig.sourceControlApi}${name}`
    );
  }
}
