import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { DrawerModule } from '../shared/components/drawer/drawer.module';
import { FooterComponent } from './footer/footer.component';
import { LogoComponent } from './header/components/logo/logo.component';
import { MenuComponent } from './header/components/menu/menu.component';
import { HeaderComponent } from './header/header.component';
import { SocialComponent } from './social/social.component';
import { EmailComponent } from './email/email.component';
import { LoadingOpenComponent } from './loading-open/loading-open.component';

const nzModules = [
  NzIconModule,
];

@NgModule({
  declarations: [
    HeaderComponent,
    LogoComponent,
    MenuComponent,
    FooterComponent,
    SocialComponent,
    EmailComponent,
    LoadingOpenComponent
  ],
  imports: [
    CommonModule,
    nzModules,
    FormsModule,
    DrawerModule
  ],
  exports: [
    LoadingOpenComponent,
    HeaderComponent,
    LogoComponent,
    MenuComponent,
    FooterComponent,
    SocialComponent,
    EmailComponent
  ]
})
export class LayoutModule { }
