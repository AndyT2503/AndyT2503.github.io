import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { injectAppConfig } from 'src/app/shared/config/config.di';
import { GithubService } from 'src/app/shared/services';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NzIconModule],
})
export class FooterComponent {
  private readonly githubService = inject(GithubService);
  private readonly appConfig = injectAppConfig();
  repoInfo = toSignal(this.githubService.getRepoInfo(this.appConfig.repoName));
  repoUrl = this.appConfig.sourceControlUrl + this.appConfig.repoName;
}
