import {
  ChangeDetectionStrategy,
  ChangeDetectorRef, Component, inject, OnInit
} from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { injectAppConfig } from 'src/app/shared/config/config.di';
import { GithubResponse } from 'src/app/shared/models';
import { GithubService } from 'src/app/shared/services';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NzIconModule]
})
export class FooterComponent implements OnInit {
  private readonly githubService = inject(GithubService);
  private readonly appConfig = injectAppConfig();
  private readonly cdr = inject(ChangeDetectorRef);
  repoInfo = {} as GithubResponse;
  repoUrl = this.appConfig.sourceControlUrl + this.appConfig.repoName;

  ngOnInit(): void {
    this.githubService.getRepoInfo(this.appConfig.repoName).subscribe((res) => {
      this.repoInfo = res;
      this.cdr.markForCheck();
    });
  }
}
