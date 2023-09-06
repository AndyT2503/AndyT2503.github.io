import { animate, style, transition, trigger } from '@angular/animations';
import {
  Overlay,
  OverlayConfig,
  OverlayModule,
  OverlayRef,
} from '@angular/cdk/overlay';
import { CdkPortalOutlet, TemplatePortal } from '@angular/cdk/portal';
import { NgClass, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Subject, takeUntil } from 'rxjs';
import { ClickOutsideDirective } from '../../directives';

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
    NgTemplateOutlet,
    NgIf,
  ],
  animations: [
    trigger('slideInOut', [
      transition('void => right', [
        style({ transform: 'translateX(100%)' }),
        animate('200ms ease-in'),
      ]),
      transition('right => void', [
        animate('200ms ease-in', style({ transform: 'translateX(100%)' })),
      ]),
      transition('void => left', [
        style({ transform: 'translateX(-100%)' }),
        animate('200ms ease-in', style({ transform: 'translateX(0%)' })),
      ]),
      transition('left => void', [
        animate('200ms ease-in', style({ transform: 'translateX(-100%)' })),
      ]),
      transition('void => top', [
        style({ transform: 'translateY(-100%)' }),
        animate('200ms ease-in', style({ transform: 'translateY(0%)' })),
      ]),
      transition('top => void', [
        animate('200ms ease-in', style({ transform: 'translateY(-100%)' })),
      ]),
      transition('void => bottom', [
        style({ transform: 'translateY(100%)' }),
        animate('200ms ease-in'),
      ]),
      transition('bottom => void', [
        animate('200ms ease-in', style({ transform: 'translateY(100%)' })),
      ]),
    ]),
  ],
})
export class DrawerComponent implements OnDestroy {
  @ViewChild('drawerTemplate', { static: true })
  drawerTemplate!: TemplateRef<void>;
  @ViewChild(CdkPortalOutlet, { static: false })
  bodyPortalOutlet?: CdkPortalOutlet;
  private readonly viewContainerRef = inject(ViewContainerRef);
  private readonly overlay = inject(Overlay);
  private overlayRef?: OverlayRef | null;
  private portal?: TemplatePortal;
  private readonly destroyed$ = new Subject<void>();
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

  private isVisible = false; //Checking whether drawer is actually visible to user
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
    this.disposeOverlay();
  }

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
        .pipe(takeUntil(this.destroyed$))
        .subscribe((event: KeyboardEvent) => {
          if (event.code === 'Escape' && this._isOpen) {
            this.close();
          }
        });
    }
  }

  private disposeOverlay(): void {
    const transitionTime = 200;
    setTimeout(() => {
      this.overlayRef?.dispose();
      this.overlayRef = null;
    }, transitionTime);
  }

  close(): void {
    this.disposeOverlay();
    this._isOpen = false;
    this.isOpenChange.emit(this._isOpen);
  }
}
