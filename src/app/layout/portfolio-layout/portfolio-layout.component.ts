import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { LucideIconComponent } from '@shared/components';
import { MenuService } from '@shared/services';
import { filter, map, startWith } from 'rxjs';

type NavItem = {
  id: string;
  label: string;
  icon: 'house' | 'user' | 'briefcase' | 'folder-git-2' | 'book-open' | 'send';
};

@Component({
  selector: 'app-portfolio-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgClass, LucideIconComponent],
  templateUrl: './portfolio-layout.component.html',
  styleUrls: ['./portfolio-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioLayoutComponent {
  private readonly router = inject(Router);

  readonly activeSection = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map(() => {
        const url = this.router.url;

        if (url.includes('/blog/')) return 'blog';

        const hash = url.split('#')[1];
        return hash || 'intro';
      }),
      startWith('intro'),
    ),
    { initialValue: 'intro' },
  );

  readonly navItems: ReadonlyArray<NavItem> = [
    { id: 'intro', label: 'Intro', icon: 'house' },
    { id: 'about', label: 'About', icon: 'user' },
    { id: 'experience', label: 'Experience', icon: 'briefcase' },
    { id: 'projects', label: 'Projects', icon: 'folder-git-2' },
    { id: 'blog', label: 'Blog', icon: 'book-open' },
    { id: 'contact', label: 'Contact', icon: 'send' },
  ];

  scrollToSection(id: string) {
    this.router.navigate(['/'], { fragment: id });
  }
}
