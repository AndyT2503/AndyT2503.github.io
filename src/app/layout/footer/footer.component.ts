import {
  ChangeDetectionStrategy,
  ChangeDetectorRef, Component, inject, OnInit
} from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { GithubResponse } from 'src/app/shared/models';
import { GithubService } from 'src/app/shared/services';
import { environment } from 'src/environments/environment';

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
  private readonly cdr = inject(ChangeDetectorRef);
  repoInfo = {} as GithubResponse;
  repoUrl = environment.sourceControlUrl + environment.repoName;

  ngOnInit(): void {
    this.githubService.getRepoInfo(environment.repoName).subscribe((res) => {
      this.repoInfo = res;
      this.cdr.markForCheck();
    });
  }
}
