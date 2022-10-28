import { NzIconModule } from 'ng-zorro-antd/icon';
import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { ClickOutsideDirective } from '../../directives';
@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, ClickOutsideDirective, NzIconModule],
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
export class DrawerComponent {
  _width!: string;
  _height!: string;
  _isOpen!: boolean;
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
  @Input() set isOpen(value: boolean) {
    if (!value) {
      this.isVisible = value;
    }
    this._isOpen = value;
  }
  @Output() isOpenChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output() onClose = new EventEmitter<void>();

  private isVisible = false; //Checking whether drawer is actually visible to user
  constructor(
  ) { }


  onClickOutside(): void {
    //when drawer was initialized but not visible to user, set visible = true and skip close action
    if (!this.isVisible) {
      this.isVisible = true;
      return;
    }
    this.close();
  }

  close(): void {
    this._isOpen = false;
    this.isOpenChange.emit(this._isOpen);
  }
}
