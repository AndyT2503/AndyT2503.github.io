import { ChangeDetectionStrategy, Component, input, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { LucideIconComponent } from '@shared/components';
import { ProjectData } from '@shared/models';
import { TooltipDirective } from '@shared/directives/tooltip.directive';

@Component({
  selector: 'app-featured-project-card',
  templateUrl: './featured-project-card.component.html',
  styleUrls: ['./featured-project-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgClass, LucideIconComponent, TooltipDirective],
})
export class FeaturedProjectCardComponent {
  readonly project = input.required<ProjectData>();
  readonly gradient = input.required<string>();
}
