import { isPlatformServer } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  DOCUMENT,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { Router } from '@angular/router';
import { injectWindow } from '@shared/providers';
import { MenuService } from '@shared/services/menu.service';
import { AboutComponent } from './components/about/about.component';
import { BlogComponent } from './components/blog/blog.component';
import { ContactComponent } from './components/contact/contact.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { GeneralInfoComponent } from './components/general-info/general-info.component';
import { ProjectsComponent } from './components/projects/projects.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    AboutComponent,
    ContactComponent,
    ExperienceComponent,
    GeneralInfoComponent,
    ProjectsComponent,
    BlogComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements AfterViewInit {
  private readonly router = inject(Router);
  private readonly document = inject(DOCUMENT);
  private readonly menuService = inject(MenuService);
  private readonly window = injectWindow();
  private readonly destroyRef = inject(DestroyRef);
  private readonly platformId = inject(PLATFORM_ID);

  ngAfterViewInit(): void {
    if (isPlatformServer(this.platformId)) return;
    this.handleDefaultHash();
    this.handleScrollUpdateUrl();
  }

  private handleDefaultHash(): void {
    const isHome = this.window.location.pathname === '/';
    const hasHash = !!this.window.location.hash;

    if (isHome && !hasHash) {
      this.menuService.setActiveSection('intro');

      this.window.history.replaceState(
        null,
        '',
        `${this.window.location.pathname}#intro`,
      );
    }
  }

  private handleScrollUpdateUrl(): void {
    let ticking = false;

    const onScroll = () => {
      if (ticking || this.menuService.isAutoScrolling()) return;

      ticking = true;

      requestAnimationFrame(() => {
        const sections = [
          'intro',
          'about',
          'experience',
          'projects',
          'blog',
          'contact',
        ];

        const scrollPos =
          this.document.documentElement.scrollTop +
          this.document.documentElement.clientHeight / 3;

        let current = 'intro';

        for (const id of sections) {
          const el = this.document.getElementById(id);

          if (!el) continue;

          if (el.offsetTop <= scrollPos) {
            current = id;
          }
        }

        const isHome = !this.router.url.includes('/blog/');

        if (!isHome) {
          ticking = false;
          return;
        }

        if (this.menuService.activeSection() !== current) {
          this.menuService.setActiveSection(current);
          history.replaceState(
            null,
            '',
            `${this.document.location.pathname}#${current}`,
          );
        }

        ticking = false;
      });
    };

    this.document.addEventListener('scroll', onScroll, {
      passive: true,
    });

    this.destroyRef.onDestroy(() => {
      this.document.removeEventListener('scroll', onScroll);
    });
  }
}
