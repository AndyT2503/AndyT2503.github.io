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
            import('@src/app/main/main.component').then((m) => m.MainComponent),
          loadChildren: () =>
            import('@src/app/main/main.routes').then((m) => m.mainRoutes),
        },
      ],
      withPreloading(PreloadAllModules),
      withComponentInputBinding(),
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      }),
    ),
    provideHttpClient(withFetch()),
    importProvidersFrom(MarkdownModule.forRoot()),
    provideAppConfig(environment),
  ],
};
