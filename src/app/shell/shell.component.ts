import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  inject,
} from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { injectWindow } from '@shared/providers';
import { MenuService } from '@shared/services/menu.service';
import { BottomNavComponent } from './components/bottom-nav/bottom-nav.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { MobileHeaderComponent } from './components/mobile-header/mobile-header.component';

export type NavItem = {
  id: string;
  label: string;
  icon: 'house' | 'user' | 'briefcase' | 'folder-git-2' | 'book-open' | 'send';
};

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [
    RouterOutlet,
    SideNavComponent,
    BottomNavComponent,
    MobileHeaderComponent,
  ],
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellComponent {
  private readonly router = inject(Router);
  private readonly menuService = inject(MenuService);
  private readonly document = inject(DOCUMENT);
  private readonly window = injectWindow();

  readonly activeSection = inject(MenuService).activeSection;

  readonly navItems: NavItem[] = [
    { id: 'intro', label: 'Intro', icon: 'house' },
    { id: 'about', label: 'About', icon: 'user' },
    { id: 'experience', label: 'Experience', icon: 'briefcase' },
    { id: 'projects', label: 'Projects', icon: 'folder-git-2' },
    { id: 'blog', label: 'Blog', icon: 'book-open' },
    { id: 'contact', label: 'Contact', icon: 'send' },
  ];

  clickNavItem(id: string): void {
    const isHome = !this.router.url.includes('blog/');
    if (!isHome) {
      this.router.navigate(['/'], { fragment: id });
      return;
    }
    this.menuService.scrollToSection(id);
  }
}
