import { animate, style, transition, trigger } from '@angular/animations';
import {
  Overlay,
  OverlayConfig,
  OverlayModule,
  OverlayRef,
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ClickOutsideDirective } from '../../directives';

const ANIMATE_TIMINGS = 200;
@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    ClickOutsideDirective,
    NzIconModule,
    OverlayModule,
    NgClass,
    NgTemplateOutlet
],
  animations: [
    trigger('slideInOut', [
      transition('void => right', [
        style({ transform: 'translateX(100%)' }),
        animate(`${ANIMATE_TIMINGS}ms ease-in`),
      ]),
      transition('right => void', [
        animate(
          `${ANIMATE_TIMINGS}ms ease-in`,
          style({ transform: 'translateX(100%)' })
        ),
      ]),
      transition('void => left', [
        style({ transform: 'translateX(-100%)' }),
        animate(
          `${ANIMATE_TIMINGS}ms ease-in`,
          style({ transform: 'translateX(0%)' })
        ),
      ]),
      transition('left => void', [
        animate(
          `${ANIMATE_TIMINGS}ms ease-in`,
          style({ transform: 'translateX(-100%)' })
        ),
      ]),
      transition('void => top', [
        style({ transform: 'translateY(-100%)' }),
        animate(
          `${ANIMATE_TIMINGS}ms ease-in`,
          style({ transform: 'translateY(0%)' })
        ),
      ]),
      transition('top => void', [
        animate(
          `${ANIMATE_TIMINGS}ms ease-in`,
          style({ transform: 'translateY(-100%)' })
        ),
      ]),
      transition('void => bottom', [
        style({ transform: 'translateY(100%)' }),
        animate(`${ANIMATE_TIMINGS}ms ease-in`),
      ]),
      transition('bottom => void', [
        animate(
          `${ANIMATE_TIMINGS}ms ease-in`,
          style({ transform: 'translateY(100%)' })
        ),
      ]),
    ]),
  ],
})
export class DrawerComponent implements OnDestroy {
  @ViewChild('drawerTemplate', { static: true })
  drawerTemplate!: TemplateRef<void>;
  private readonly viewContainerRef = inject(ViewContainerRef);
  private readonly overlay = inject(Overlay);
  private readonly destroyRef = inject(DestroyRef);
  private overlayRef?: OverlayRef | null;
  private portal?: TemplatePortal | null;
  private isVisible = false; //Checking whether drawer is actually visible to user
  _width!: string;
  _height!: string;
  _isOpen!: boolean;
  @Input() closeIcon: boolean = true;
  @Input() content!: TemplateRef<any>;
  @Input() position!: 'top' | 'left' | 'bottom' | 'right';
  @Input() set width(value: string) {
    if (this.position === 'bottom' || this.position === 'top') return;
    this._width = value;
  }
  @Input() set height(value: string) {
    if (this.position === 'right' || this.position === 'left') return;
    this._height = value;
  }
  @Input() set isOpen(value: boolean) {
    if (!value) {
      this.isVisible = value;
    }
    this._isOpen = value;
    if (value) {
      this.attachOverlay();
    } else {
      this.disposeOverlay();
    }
  }
  @Output() isOpenChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onClose = new EventEmitter<void>();

  onClickOutside(): void {
    //when drawer was initialized but not visible to user, set visible = true and skip close action
    if (!this.isVisible) {
      this.isVisible = true;
      return;
    }
    this.close();
  }

  private attachOverlay(): void {
    if (!this.overlayRef) {
      this.portal = new TemplatePortal(
        this.drawerTemplate,
        this.viewContainerRef
      );
      this.overlayRef = this.overlay.create(
        new OverlayConfig({
          disposeOnNavigation: false,
          positionStrategy: this.overlay.position().global(),
          scrollStrategy: this.overlay.scrollStrategies.reposition(),
        })
      );
    }

    if (this.overlayRef && !this.overlayRef.hasAttached()) {
      this.overlayRef.attach(this.portal);
      this.overlayRef
        .keydownEvents()
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((event) => {
          if (event.code === 'Escape' && this._isOpen) {
            this.close();
          }
        });
    }
  }

  private disposeOverlay(): void {
    setTimeout(() => {
      if (this.overlayRef && this.portal) {
        this.overlayRef.dispose();
        this.overlayRef = null;
        this.portal = null;
      }
    }, ANIMATE_TIMINGS);
  }

  close(): void {
    this.isOpenChange.emit(false);
  }

  ngOnDestroy(): void {
    this.disposeOverlay();
  }
}
