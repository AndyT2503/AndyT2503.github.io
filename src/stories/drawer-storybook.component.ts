import { Component, Input } from '@angular/core';
import { DrawerComponent } from 'src/app/shared/components';

@Component({
  selector: 'storybook-drawer',
  standalone: true,
  imports: [DrawerComponent],
  template: `
    <div class="container">
      <button (click)="isOpen = !isOpen">Show Drawer</button>
      <app-drawer
        [(isOpen)]="isOpen"
        [position]="position"
        [width]="width"
        [height]="height"
        [closeIcon]="closeIcon"
        [content]="contentDrawer"
      ></app-drawer>
      <ng-template #contentDrawer>
        <div [innerHTML]="content"></div>
      </ng-template>
    </div>
  `,
  styleUrls: ['./drawer-storybook.css'],
})
export class DrawerStorybookComponent {
  @Input() closeIcon = true;
  @Input() content!: string;
  @Input() position!: 'top' | 'left' | 'bottom' | 'right';
  @Input() width!: string;
  @Input() height!: string;
  isOpen = false;
}
