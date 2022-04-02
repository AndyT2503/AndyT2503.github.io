import { trigger, transition, style, animate } from '@angular/animations';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, HostListener, Input, OnInit, Output, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('slideInOut', [
      transition('void => right', [
        style({transform: 'translateX(100%)'}),
        animate('200ms ease-in')
      ]),
      transition('right => void', [
        animate('200ms ease-in', style({transform: 'translateX(100%)'}))
      ]),
      transition('void => left', [
        style({transform: 'translateX(-100%)'}),
        animate('200ms ease-in', style({transform: 'translateX(0%)'}))
      ]),
      transition('left => void', [
        animate('200ms ease-in', style({transform: 'translateX(-100%)'}))
      ]),
      transition('void => top', [
        style({transform: 'translateY(-100%)'}),
        animate('200ms ease-in', style({transform: 'translateY(0%)'}))
      ]),
      transition('top => void', [
        animate('200ms ease-in', style({transform: 'translateY(-100%)'}))
      ]),
      transition('void => bottom', [
        style({transform: 'translateY(100%)'}),
        animate('200ms ease-in')
      ]),
      transition('bottom => void', [
        animate('200ms ease-in', style({transform: 'translateY(100%)'}))
      ])
    ])
  ]
})
export class DrawerComponent implements OnInit {
  _width!: string;
  _height!: string;
  @Input() closeIcon: boolean = true;
  @Input() content!: TemplateRef<any>;
  @Input() position!: 'top' |'left' | 'bottom' | 'right';
  @Input() set width(value: string) {
    if (this.position === 'bottom' || this.position === 'top') return;
    this._width = value;
  };
  @Input() set height(value: string) {
    if (this.position === 'right' || this.position === 'left') return;
    this._height = value;
  };
  @Input() isOpen: boolean = false;
  @Output() isOpenChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output() onClose = new EventEmitter<void>();

  private isVisible = false; //Checking whether drawer is really visible with user
  constructor(
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    console.log('asd')
  }

  onClickOutSide(): void {
    //when drawer was initialized but not visible with user, set visible = true and skip close action
    if (!this.isVisible) {
      this.isVisible = true;
      return;
    }
    this.close();
  }

  close(): void {
    this.isVisible = false;
    this.isOpen = false;
    this.isOpenChange.emit(this.isOpen);
  }
}
