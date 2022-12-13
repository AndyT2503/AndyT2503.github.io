import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { injectAppConfig } from '../config/config.di';
import { GithubResponse } from '../models';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  private readonly http = inject(HttpClient);
  private readonly appConfig = injectAppConfig();
  getRepoInfo(name: string) {
    return this.http.get<GithubResponse>(
      `${this.appConfig.sourceControlApi}${name}`
    );
  }
}
