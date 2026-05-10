import { TestBed } from '@angular/core/testing';

import { LucideIconComponent } from './lucide-icon.component';

describe('LucideIconComponent', () => {
  it('normalizes numeric inputs and renders the requested icon', async () => {
    TestBed.configureTestingModule({ imports: [LucideIconComponent] });

    const fixture = TestBed.createComponent(LucideIconComponent);
    fixture.componentRef.setInput('name', 'mail');
    fixture.componentRef.setInput('size', '32');
    fixture.componentRef.setInput('strokeWidth', '3');
    await fixture.whenStable();

    const svg = fixture.nativeElement.querySelector('svg') as SVGElement;
    expect(fixture.componentInstance.normalizedSize()).toBe(32);
    expect(fixture.componentInstance.normalizedStrokeWidth()).toBe(3);
    expect(svg.getAttribute('width')).toBe('32');
    expect(svg.innerHTML).toContain('<rect');
  });

  it('falls back to default size values when inputs are not numeric', async () => {
    TestBed.overrideComponent(LucideIconComponent, { set: { template: '' } });
    TestBed.configureTestingModule({ imports: [LucideIconComponent] });

    const fixture = TestBed.createComponent(LucideIconComponent);
    fixture.componentRef.setInput('size', 'large');
    fixture.componentRef.setInput('strokeWidth', 'wide');
    await fixture.whenStable();

    expect(fixture.componentInstance.normalizedSize()).toBe(24);
    expect(fixture.componentInstance.normalizedStrokeWidth()).toBe(2);
  });
});
