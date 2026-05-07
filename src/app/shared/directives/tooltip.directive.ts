import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  input,
  Input,
  OnDestroy,
  Renderer2,
} from '@angular/core';
import { injectWindow } from '@shared/providers/window.di';

@Directive({
  selector: '[appTooltip]',
  standalone: true,
})
export class TooltipDirective implements OnDestroy {
  private readonly el = inject(ElementRef);
  private readonly renderer = inject(Renderer2);
  private readonly window = injectWindow();

  readonly text = input.required<string>({ alias: 'appTooltip' });
  readonly tooltipPosition = input<'top' | 'bottom' | 'left' | 'right'>('top');

  private tooltipEl: HTMLElement | null = null;

  @HostListener('mouseenter')
  onMouseEnter() {
    if (!this.text) return;

    this.createTooltip();
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.destroyTooltip();
  }

  private createTooltip() {
    this.tooltipEl = this.renderer.createElement('div');

    this.renderer.appendChild(
      this.tooltipEl,
      this.renderer.createText(this.text()),
    );

    this.renderer.appendChild(document.body, this.tooltipEl);

    this.renderer.addClass(this.tooltipEl, 'app-tooltip');

    const hostPos = this.el.nativeElement.getBoundingClientRect();

    const tooltipPos = this.calculatePosition(hostPos);

    this.renderer.setStyle(this.tooltipEl, 'top', `${tooltipPos.top}px`);
    this.renderer.setStyle(this.tooltipEl, 'left', `${tooltipPos.left}px`);
  }

  private calculatePosition(hostPos: DOMRect) {
    const tooltip = this.tooltipEl!;
    const scrollY = this.window.scrollY || this.window.pageYOffset;
    const scrollX = this.window.scrollX || this.window.pageXOffset;

    const tooltipWidth = tooltip.offsetWidth;
    const tooltipHeight = tooltip.offsetHeight;

    let top = 0;
    let left = 0;

    switch (this.tooltipPosition()) {
      case 'top':
        top = hostPos.top + scrollY - tooltipHeight - 8;
        left = hostPos.left + scrollX + hostPos.width / 2 - tooltipWidth / 2;
        break;

      case 'bottom':
        top = hostPos.bottom + scrollY + 8;
        left = hostPos.left + scrollX + hostPos.width / 2 - tooltipWidth / 2;
        break;

      case 'left':
        top = hostPos.top + scrollY + hostPos.height / 2 - tooltipHeight / 2;
        left = hostPos.left + scrollX - tooltipWidth - 8;
        break;

      case 'right':
        top = hostPos.top + scrollY + hostPos.height / 2 - tooltipHeight / 2;
        left = hostPos.right + scrollX + 8;
        break;
    }

    return { top, left };
  }

  private destroyTooltip() {
    if (this.tooltipEl) {
      this.renderer.removeChild(document.body, this.tooltipEl);
      this.tooltipEl = null;
    }
  }

  ngOnDestroy() {
    this.destroyTooltip();
  }
}
