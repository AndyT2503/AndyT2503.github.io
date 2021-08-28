import { PageProjectDetailComponent } from './components/page-project-detail/page-project-detail.component';
import { PageProjectListComponent } from './components/page-project-list/page-project-list.component';
import { PageProjectComponent } from './components/page-project/page-project.component';
import { PageContactComponent } from './components/page-contact/page-contact.component';
import { PageAboutComponent } from './components/page-about/page-about.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'about',
    component: PageAboutComponent
  },
  {
    path: 'project',
    component: PageProjectComponent,
    children: [
      {
        path: '',
        component: PageProjectListComponent
      },
      {
        path: ':slug',
        component: PageProjectDetailComponent
      }
    ]
  },
  {
    path: 'contact',
    component: PageContactComponent
  },
  { path: '', redirectTo: 'about', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
