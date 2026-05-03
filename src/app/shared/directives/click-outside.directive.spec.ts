import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { ClickOutsideDirective } from './click-outside.directive';

@Component({
  standalone: true,
  imports: [ClickOutsideDirective],
  template: `
    <div id="host" clickOutside (clickOutside)="onOutside()">
      <span id="inside">inside</span>
    </div>
    <div id="outside">outside</div>
  `,
})
class HostComponent {
  onOutside = vi.fn();
}

describe('ClickOutsideDirective', () => {
  it('emits when clicking outside the host element', async () => {
    TestBed.configureTestingModule({ imports: [HostComponent] });
    const fixture = TestBed.createComponent(HostComponent);
    await fixture.whenStable();

    const outside = fixture.nativeElement.querySelector('#outside') as HTMLElement;
    outside.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, composed: true }));
    await fixture.whenStable();

    expect(fixture.componentInstance.onOutside).toHaveBeenCalled();
  });

  it('does not emit when clicking inside the host element', async () => {
    TestBed.configureTestingModule({ imports: [HostComponent] });
    const fixture = TestBed.createComponent(HostComponent);
    await fixture.whenStable();

    const inside = fixture.nativeElement.querySelector('#inside') as HTMLElement;
    inside.click();
    await fixture.whenStable();

    expect(fixture.componentInstance.onOutside).not.toHaveBeenCalled();
  });
});
