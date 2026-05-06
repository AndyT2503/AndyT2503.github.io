import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideIconComponent, LucideIconName } from '@shared/components';
import { NavItem } from '../../shell.component';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [NgClass, RouterLink, LucideIconComponent],
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideNavComponent {
  readonly navItems = input.required<NavItem[]>();
  readonly activeSection = input.required<string>();

  readonly socials: { href: string; label: string; icon: LucideIconName }[] = [
    {
      href: 'https://github.com/AndyT2503',
      icon: 'github',
      label: 'GitHub',
    },
    {
      href: 'https://www.linkedin.com/in/tu-hoang-787951195/',
      icon: 'linkedin',
      label: 'LinkedIn',
    },
    {
      href: 'https://www.instagram.com/htu.18/',
      icon: 'instagram',
      label: 'Instagram',
    },
    {
      href: 'https://www.facebook.com/AndyTu.Hoang/',
      icon: 'facebook',
      label: 'Facebook',
    },
  ];

  onClickNavItem = output<string>();
}
