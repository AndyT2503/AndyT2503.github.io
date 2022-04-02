import { ClickOutsideDirective } from './click-outside.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [ClickOutsideDirective],
  imports: [
    CommonModule
  ],
  exports: [ClickOutsideDirective]
})
export class ClickOutsideDirectiveModule { }
