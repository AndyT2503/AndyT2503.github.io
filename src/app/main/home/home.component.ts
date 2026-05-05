import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  NgZone,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AboutComponent } from '../about/about.component';
import { ContactComponent } from '../contact/contact.component';
import { ExperienceComponent } from '../experience/experience.component';
import { GeneralInfoComponent } from '../general-info/general-info.component';
import { WorkComponent } from '../work/work.component';
import { BlogComponent } from './../blog/blog.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    AboutComponent,
    ContactComponent,
    ExperienceComponent,
    GeneralInfoComponent,
    WorkComponent,
    BlogComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements AfterViewInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private ngZone = inject(NgZone);
  private hasScrolled = false;

  ngAfterViewInit(): void {
    this.handleInitialScroll();
    this.handleScrollUpdateUrl();
  }

  private handleInitialScroll(): void {
    const fragment = this.route.snapshot.fragment || 'intro';

    this.ngZone.runOutsideAngular(() => {
      const attemptScroll = () => {
        if (this.hasScrolled) return;

        const el = document.getElementById(fragment);

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

    window.addEventListener('scroll', () => {
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

        const scrollPos = window.scrollY + window.innerHeight / 3;

        let current = 'intro';

        for (const id of sections) {
          const el = document.getElementById(id);
          if (!el) continue;

          if (el.offsetTop <= scrollPos) {
            current = id;
          }
        }

        const currentHash = this.route.snapshot.fragment;

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
