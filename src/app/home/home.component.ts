import { isPlatformBrowser } from '@angular/common';
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
import { SeoService } from '@shared/services/seo.service';
import { AboutComponent } from './components/about/about.component';
import { BlogComponent } from './components/blog/blog.component';
import { ContactComponent } from './components/contact/contact.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { IntroComponent } from './components/intro/intro.component';
import { ProjectsComponent } from './components/projects/projects.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    AboutComponent,
    ContactComponent,
    ExperienceComponent,
    IntroComponent,
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
  private readonly seoService = inject(SeoService);

  ngAfterViewInit(): void {
    this.seoService.applyHome();
    if (isPlatformBrowser(this.platformId)) {
      this.handleInitialFragment();
    }
  }

  private handleInitialFragment(): void {
    const fragment = this.getHashFragment();

    // Double rAF ensures child components are fully rendered in DOM
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (fragment && fragment !== 'intro') {
          this.menuService.scrollToSection(fragment);
        } else {
          this.menuService.setActiveSection('intro');
          this.window.history.replaceState(null, '', '/#intro');
        }

        // Start listening to scroll only after initial navigation settles
        setTimeout(() => this.handleScrollUpdateUrl(), 1500);
      });
    });
  }

  private getHashFragment(): string {
    const hash = this.window.location.hash;
    return hash ? hash.substring(1) : '';
  }

  private handleScrollUpdateUrl(): void {
    let ticking = false;

    const onScroll = () => {
      if (ticking || this.menuService.isAutoScrolling()) return;

      ticking = true;

      requestAnimationFrame(() => {
        const isHome = !this.router.url.includes('/blog/');
        if (!isHome) {
          ticking = false;
          return;
        }

        const current = this.detectCurrentSection();

        if (current && this.menuService.activeSection() !== current) {
          this.menuService.setActiveSection(current);
          this.window.history.replaceState(null, '', `/#${current}`);
        }

        ticking = false;
      });
    };

    this.document.addEventListener('scroll', onScroll, { passive: true });

    this.destroyRef.onDestroy(() => {
      this.document.removeEventListener('scroll', onScroll);
    });
  }

  private detectCurrentSection(): string {
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

    return current;
  }
}
