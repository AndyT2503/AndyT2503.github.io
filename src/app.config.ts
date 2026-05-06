import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {
  PreloadAllModules,
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
  withPreloading,
} from '@angular/router';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import { MarkdownModule } from 'ngx-markdown';

import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

import {
  CloseOutline,
  FacebookOutline,
  FolderOutline,
  ForkOutline,
  FormOutline,
  GithubOutline,
  InstagramOutline,
  LinkedinOutline,
  MenuOutline,
  StarOutline,
} from '@ant-design/icons-angular/icons';

import { provideAppConfig } from '@shared/config/config.di';
import { environment } from '@shared/config/environment';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

registerLocaleData(en);

const usedNzIcons = [
  CloseOutline,
  FacebookOutline,
  FolderOutline,
  ForkOutline,
  FormOutline,
  GithubOutline,
  InstagramOutline,
  LinkedinOutline,
  MenuOutline,
  StarOutline,
];

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
    provideNzIcons(usedNzIcons),
    { provide: NZ_I18N, useValue: en_US },
    provideAppConfig(environment), provideClientHydration(withEventReplay()),
  ],
};
