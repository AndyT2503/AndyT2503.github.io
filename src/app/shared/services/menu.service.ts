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
    const el = this.document.getElementById(id);

    if (!el) return;

    this.setActiveSection(id);

    this.window.history.replaceState(
      null,
      '',
      `${this.window.location.pathname}#${id}`,
    );

    this.isAutoScrollingSignal.set(true);

    this.window.scrollTo({
      top: id === 'intro' ? 0 : el.offsetTop,
      behavior: 'smooth',
    });

    clearTimeout(this.autoScrollTimeout);

    this.autoScrollTimeout = setTimeout(() => {
      this.isAutoScrollingSignal.set(false);
    }, 1200);
  }
}
