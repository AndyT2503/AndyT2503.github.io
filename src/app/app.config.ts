import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {
  PreloadAllModules,
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
  withPreloading,
} from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';

import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

import { provideAppConfig } from '@shared/config/config.di';
import { environment } from '@shared/config/environment';

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
      withPreloading(PreloadAllModules),
      withComponentInputBinding(),
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
      }),
    ),
    provideHttpClient(withFetch()),
    importProvidersFrom(MarkdownModule.forRoot()),
    provideAppConfig(environment),
  ],
};
