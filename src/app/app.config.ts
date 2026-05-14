import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {
  PreloadAllModules,
  provideRouter,
  withComponentInputBinding,
  withPreloading,
} from '@angular/router';
import {
  provideClientHydration,
  withIncrementalHydration,
} from '@angular/platform-browser';
import { MarkdownModule } from 'ngx-markdown';

import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

import { provideEnvironment } from '@shared/providers';
import { environment } from '@src/environments/environment';

registerLocaleData(en);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      [
        {
          path: '',
          loadComponent: () =>
            import('@src/app/home/home.component').then((c) => c.HomeComponent),
        },
        {
          path: 'blog/:slug',
          loadComponent: () =>
            import('@src/app/blog-detail/blog-detail.component').then(
              (c) => c.BlogDetailComponent,
            ),
        },
      ],
      withComponentInputBinding(),
      withPreloading(PreloadAllModules)
    ),
    provideHttpClient(withFetch()),
    provideClientHydration(withIncrementalHydration()),
    importProvidersFrom(MarkdownModule.forRoot()),
    provideEnvironment(environment),
  ],
};
