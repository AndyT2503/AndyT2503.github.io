import { Component, TemplateRef, ViewChild } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { DrawerComponent } from './drawer.component';

@Component({
  standalone: true,
  imports: [DrawerComponent],
  template: `
    <ng-template #contentTemplate>content</ng-template>
    <app-drawer
      [content]="contentTemplate"
      position="right"
      width="70%"
      [(isOpen)]="isOpen"
    ></app-drawer>
  `,
})
class HostComponent {
  @ViewChild('contentTemplate', { static: true }) contentTemplate!: TemplateRef<void>;
  isOpen = false;
}

describe('DrawerComponent', () => {
  it('emits isOpenChange=false when close() is called', async () => {
    TestBed.overrideComponent(DrawerComponent, {
      set: {
        template: `<ng-template #drawerTemplate></ng-template>`,
      },
    });
    TestBed.configureTestingModule({ imports: [HostComponent] });
    const fixture = TestBed.createComponent(HostComponent);
    await fixture.whenStable();

    const drawer = fixture.debugElement.children.find((c) => c.componentInstance instanceof DrawerComponent)
      ?.componentInstance as DrawerComponent;

    const emitted: boolean[] = [];
    drawer.isOpenChange.subscribe((v) => emitted.push(v));

    drawer.close();

    expect(emitted).toEqual([false]);
  });

  it('skips the first outside click before closing on the next one', async () => {
    TestBed.overrideComponent(DrawerComponent, {
      set: {
        template: `<ng-template #drawerTemplate></ng-template>`,
      },
    });
    TestBed.configureTestingModule({ imports: [HostComponent] });
    const fixture = TestBed.createComponent(HostComponent);
    await fixture.whenStable();

    const drawer = fixture.debugElement.children.find((c) => c.componentInstance instanceof DrawerComponent)
      ?.componentInstance as DrawerComponent;

    const emitted: boolean[] = [];
    drawer.isOpenChange.subscribe((v) => emitted.push(v));

    drawer.onClickOutside();
    drawer.onClickOutside();

    expect(emitted).toEqual([false]);
  });
});
