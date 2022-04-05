import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
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
    private githubService: GithubService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.githubService.getRepoInfo(environment.repoName).subscribe(
      res => {
        this.repoInfo = res;
        this.cdr.markForCheck();
      }
    );
  }

}
