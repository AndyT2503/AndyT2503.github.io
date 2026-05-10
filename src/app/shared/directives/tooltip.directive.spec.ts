import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { TooltipDirective } from './tooltip.directive';

@Component({
  standalone: true,
  imports: [TooltipDirective],
  template: `<button appTooltip="Tooltip text" tooltipPosition="bottom">Hover</button>`,
})
class TooltipHostComponent {}

describe('TooltipDirective', () => {
  afterEach(() => {
    document.querySelectorAll('.app-tooltip').forEach((el) => el.remove());
  });

  it('creates and removes a tooltip on pointer hover', async () => {
    TestBed.configureTestingModule({ imports: [TooltipHostComponent] });

    const fixture = TestBed.createComponent(TooltipHostComponent);
    await fixture.whenStable();

    const button = fixture.nativeElement.querySelector('button') as HTMLElement;
    button.getBoundingClientRect = () =>
      ({
        top: 10,
        bottom: 30,
        left: 20,
        right: 120,
        width: 100,
        height: 20,
      }) as DOMRect;

    button.dispatchEvent(new MouseEvent('mouseenter'));
    await fixture.whenStable();

    const tooltip = document.querySelector('.app-tooltip') as HTMLElement;
    expect(tooltip).not.toBeNull();
    expect(tooltip.textContent).toBe('Tooltip text');
    expect(tooltip.style.top).toBe('38px');

    button.dispatchEvent(new MouseEvent('mouseleave'));
    await fixture.whenStable();

    expect(document.querySelector('.app-tooltip')).toBeNull();
  });
});
