import { Routes } from '@angular/router';

export const mainRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'blog/:slug',
    loadComponent: () =>
      import('./blog-detail/blog-detail.component').then(
        (c) => c.BlogDetailComponent
      ),
  },
];
