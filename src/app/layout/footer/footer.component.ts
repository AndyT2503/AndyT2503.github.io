import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { GithubResponse } from 'src/app/shared/models';
import { GithubService } from 'src/app/shared/services';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent implements OnInit {
  repoInfo!: GithubResponse
  repoUrl = environment.sourceControlUrl + environment.repoName;
  constructor(
    private githubService: GithubService
  ) { }

  ngOnInit(): void {
    this.githubService.getRepoInfo(environment.repoName).subscribe(
      res => this.repoInfo = res
    );
  }

}
