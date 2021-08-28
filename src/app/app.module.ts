import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { PageAboutComponent } from './components/page-about/page-about.component';
import { PageContactComponent } from './components/page-contact/page-contact.component';
import { PageProjectComponent } from './components/page-project/page-project.component';
import { PageProjectListComponent } from './components/page-project-list/page-project-list.component';
import { PageProjectDetailComponent } from './components/page-project-detail/page-project-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PageAboutComponent,
    PageContactComponent,
    PageProjectComponent,
    PageProjectListComponent,
    PageProjectDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
