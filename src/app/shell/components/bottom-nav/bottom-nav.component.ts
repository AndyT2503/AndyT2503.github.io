import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { LucideIconComponent } from '@shared/components';
import { NavItem } from '../../shell.component';

@Component({
  selector: 'app-bottom-nav',
  standalone: true,
  imports: [NgClass, LucideIconComponent],
  templateUrl: './bottom-nav.component.html',
  styleUrls: ['./bottom-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BottomNavComponent {
  readonly navItems = input.required<NavItem[]>();
  readonly activeSection = input.required<string | null>();

  onClickNavItem = output<string>();
}
