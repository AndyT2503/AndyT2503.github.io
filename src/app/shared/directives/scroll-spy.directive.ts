import {
  AfterViewInit,
  Directive,
  ElementRef,
  NgZone,
  OnDestroy,
  inject,
} from '@angular/core';
import { MenuService } from '@shared/services';

@Directive({
  selector: '[appScrollSpy]',
  standalone: true,
})
export class ScrollSpyDirective implements AfterViewInit, OnDestroy {
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly ngZone = inject(NgZone);
  private readonly menuService = inject(MenuService);

  private observer!: IntersectionObserver;
  private ticking = false;

  ngAfterViewInit(): void {
    const sections = Array.from(
      (this.el.nativeElement as HTMLElement).querySelectorAll<HTMLElement>('[data-section]'),
    );

    const thresholds = Array.from({ length: 21 }, (_, i) => i / 20);

    this.ngZone.runOutsideAngular(() => {
      this.observer = new IntersectionObserver(
        (entries) => {
          if (this.ticking) return;

          this.ticking = true;
          requestAnimationFrame(() => {
            const visible = entries
              .filter((e) => e.isIntersecting)
              .sort((a, b) => {
                const ay = Math.abs(a.boundingClientRect.top);
                const by = Math.abs(b.boundingClientRect.top);
                return ay - by;
              })[0];

            if (visible) {
              const id = visible.target.getAttribute('data-section')!;
              this.ngZone.run(() => {
                this.menuService.setActive(id);
                history.replaceState(null, '', `#${id}`);
              });
            }

            this.ticking = false;
          });
        },
        {
          root: null,
          threshold: thresholds,
          rootMargin: '-40% 0px -55% 0px',
        },
      );

      sections.forEach((s) => this.observer.observe(s));

      setTimeout(() => {
        const hash = window.location.hash.replace('#', '');
        if (!hash) return;

        const el = (this.el.nativeElement as HTMLElement).querySelector<HTMLElement>(
          `[data-section="${hash}"]`,
        );
        el?.scrollIntoView({ block: 'start' });
        this.menuService.setActive(hash);
      }, 0);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
