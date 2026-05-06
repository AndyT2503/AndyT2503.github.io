import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  inject,
  NgZone,
  PLATFORM_ID,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { BlogComponent } from './components/blog/blog.component';
import { ContactComponent } from './components/contact/contact.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { GeneralInfoComponent } from './components/general-info/general-info.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { isPlatformServer } from '@angular/common';

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
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly ngZone = inject(NgZone);
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private hasScrolled = false;

  ngAfterViewInit(): void {
    this.handleInitialScroll();
    this.handleScrollUpdateUrl();
  }

  private handleInitialScroll(): void {
    if (isPlatformServer(this.platformId)) return;
    const fragment = this.route.snapshot.fragment || 'intro';

    this.ngZone.runOutsideAngular(() => {
      const attemptScroll = () => {
        if (this.hasScrolled) return;

        const el = this.document.getElementById(fragment);

        if (!el) {
          requestAnimationFrame(attemptScroll);
          return;
        }

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            window.scrollTo({
              top: el.offsetTop,
              behavior: 'auto',
            });

            this.hasScrolled = true;
          });
        });
      };

      setTimeout(() => {
        requestAnimationFrame(attemptScroll);
      }, 0);
    });
  }

  private handleScrollUpdateUrl(): void {
    let ticking = false;

    this.document.addEventListener('scroll', () => {
      if (ticking) return;

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

        const scrollPos = this.document.documentElement.scrollTop + this.document.documentElement.clientHeight / 3;

        let current = 'intro';

        for (const id of sections) {
          const el = this.document.getElementById(id);
          if (!el) continue;

          if (el.offsetTop <= scrollPos) {
            current = id;
          }
        }

        const currentHash = this.route.snapshot.fragment;
        const isHome = !this.router.url.includes('/blog/');

        if (!isHome) return;

        if (currentHash !== current) {
          this.router.navigate([], {
            fragment: current,
            replaceUrl: true,
          });
        }

        ticking = false;
      });
    });
  }
}
