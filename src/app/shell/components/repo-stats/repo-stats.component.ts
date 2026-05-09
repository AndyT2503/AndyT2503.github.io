import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, HostListener, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { LucideIconComponent } from '@shared/components';
import { injectEnvironment, injectWindow } from '@shared/providers';
import { GithubService } from '@shared/services';

@Component({
  selector: 'app-repo-stats',
  standalone: true,
  imports: [CommonModule, LucideIconComponent],
  templateUrl: './repo-stats.component.html',
  styleUrls: ['./repo-stats.component.scss'],
})
export class RepoStatsComponent implements OnInit {
  private readonly environment = injectEnvironment();
  private readonly githubService = inject(GithubService);
  private readonly repoName = this.environment.repoName;
  private readonly sourceControlUrl = this.environment.sourceControlUrl;
  private readonly platformId = inject(PLATFORM_ID);
  private readonly window = injectWindow();
  readonly isVisible = signal(false);
  readonly isDesktopExpanded = signal(false);
  readonly isMobileExpanded = signal(false);

  readonly repo = signal<{
    stars: number;
    forks: number;
    url: string;
  } | null>(null);

  ngOnInit(): void {
    this.fetchRepo();
    this.handleScroll();
  }

  private fetchRepo() {
    this.githubService.getRepoInfo(this.repoName).subscribe((res) => {
      this.repo.set({
        stars: Number(res.stargazers_count),
        forks: Number(res.forks_count),
        url: `${this.sourceControlUrl}/${this.repoName}`,
      });
    });
  }

  @HostListener('window:scroll')
  handleScroll() {
    if (isPlatformBrowser(this.platformId)) {
      this.isVisible.set(this.window.scrollY > 300);
    }
  }

  expandDesktop() {
    this.isDesktopExpanded.set(true);
  }

  collapseDesktop() {
    this.isDesktopExpanded.set(false);
  }

  toggleMobile() {
    this.isMobileExpanded.update((v) => !v);
  }

  closeMobile() {
    this.isMobileExpanded.set(false);
  }
}
