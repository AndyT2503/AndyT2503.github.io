import { environment } from 'src/environments/environment';
import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { GithubResponse } from "../models";

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private readonly http = inject(HttpClient);

  getRepoInfo(name: string) {
    return this.http.get<GithubResponse>(`${environment.sourceControlApi}${name}`);
  }
}