import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ExperienceComponent } from './experience/experience.component';
import { GeneralInfoComponent } from './general-info/general-info.component';
import { WorkComponent } from './work/work.component';
import { FeaturedProjectComponent } from './work/components/featured-project/featured-project.component';
import { NormalProjectComponent } from './work/components/normal-project/normal-project.component';

const nzModules = [
  NzTabsModule,
  NzIconModule,
  NzToolTipModule
];

@NgModule({
  declarations: [
    GeneralInfoComponent,
    AboutComponent,
    ExperienceComponent,
    WorkComponent,
    ContactComponent,
    FeaturedProjectComponent,
    NormalProjectComponent
  ],
  imports: [
    CommonModule,
    nzModules
  ],
  exports: [
    GeneralInfoComponent,
    AboutComponent,
    ExperienceComponent,
    WorkComponent,
    ContactComponent
  ]
})
export class MainModule { }
