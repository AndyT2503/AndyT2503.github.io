import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  NgZone,
  OnInit,
  Renderer2,
  ViewChild,
  inject,
} from '@angular/core';
import { injectScrollEvent } from 'src/app/shared/utils';
import { LogoComponent } from './components/logo/logo.component';
import { MenuComponent } from './components/menu/menu.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [LogoComponent, MenuComponent],
})
export class HeaderComponent implements OnInit {
  @ViewChild('headerEle', { static: true })
  headerElement!: ElementRef<HTMLElement>;
  private readonly scrollEvent$ = injectScrollEvent();
  private readonly ngZone = inject(NgZone);
  private readonly renderer = inject(Renderer2);
  private currentPageOffset = window.scrollY;
  ngOnInit(): void {
    this.detectScrollDownEvent();
  }

  private detectScrollDownEvent(): void {
    this.ngZone.runOutsideAngular(() => {
      this.scrollEvent$.subscribe(() => {
        const scroll = window.scrollY;
        if (scroll > this.currentPageOffset) {
          this.renderer.addClass(
            this.headerElement.nativeElement,
            'hidden-header'
          );
        } else {
          this.renderer.removeClass(
            this.headerElement.nativeElement,
            'hidden-header'
          );
        }
        this.currentPageOffset = scroll;
      });
    });
  }
}
