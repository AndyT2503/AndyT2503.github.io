import { DOCUMENT, inject, Injectable, signal } from '@angular/core';
import { injectWindow } from '@shared/providers/window.di';

@Injectable({ providedIn: 'root' })
export class MenuService {
  private readonly document = inject(DOCUMENT);
  private readonly window = injectWindow();
  private readonly activeMenuItem = signal('');
  private readonly isAutoScrollingSignal = signal(false);
  private autoScrollTimeout?: ReturnType<typeof setTimeout>;

  readonly activeSection = this.activeMenuItem.asReadonly();
  readonly isAutoScrolling = this.isAutoScrollingSignal.asReadonly();

  setActiveSection(section: string) {
    this.activeMenuItem.set(section);
  }

  scrollToSection(id: string): void {
    this.setActiveSection(id);
    this.window.history.replaceState(null, '', `/#${id}`);
    this.isAutoScrollingSignal.set(true);
    clearTimeout(this.autoScrollTimeout);

    if (id === 'intro') {
      this.window.scrollTo({ top: 0, behavior: 'smooth' });
      this.autoScrollTimeout = setTimeout(() => {
        this.isAutoScrollingSignal.set(false);
      }, 1200);
      return;
    }

    // Scroll with retries to handle layout shifts from async content
    this.scrollWithRetry(id, 0);
  }

  private scrollWithRetry(id: string, attempt: number): void {
    const el = this.document.getElementById(id);
    if (!el) {
      this.isAutoScrollingSignal.set(false);
      return;
    }

    const targetTop = el.getBoundingClientRect().top + this.window.scrollY;
    this.window.scrollTo({ top: targetTop, behavior: 'smooth' });

    // Retry scroll after content may have shifted layout
    if (attempt < 3) {
      setTimeout(() => {
        const newTop = el.getBoundingClientRect().top + this.window.scrollY;
        const currentScroll = this.window.scrollY;
        // If position changed significantly, scroll again
        if (Math.abs(newTop - currentScroll) > 50) {
          this.scrollWithRetry(id, attempt + 1);
        } else {
          this.autoScrollTimeout = setTimeout(() => {
            this.isAutoScrollingSignal.set(false);
          }, 500);
        }
      }, 600);
    } else {
      this.autoScrollTimeout = setTimeout(() => {
        this.isAutoScrollingSignal.set(false);
      }, 500);
    }
  }
}
