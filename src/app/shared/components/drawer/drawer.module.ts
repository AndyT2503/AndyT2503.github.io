import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClickOutsideDirectiveModule } from '../../directives/click-outside-directive/click-outside-directive.module';
import { DrawerComponent } from './drawer.component';
import { NzIconModule } from 'ng-zorro-antd/icon';

const nzModules = [
  NzIconModule
]

@NgModule({
  declarations: [DrawerComponent],
  imports: [
    CommonModule,
    nzModules,
    ClickOutsideDirectiveModule
  ],
  exports: [DrawerComponent]
})
export class DrawerModule { }
