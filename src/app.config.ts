import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
  withPreloading,
  PreloadAllModules,
} from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MarkdownModule } from 'ngx-markdown';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';

import en from '@angular/common/locales/en';
import { registerLocaleData } from '@angular/common';

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
import { AppConfig } from '@shared/config/config.model';
import { environment } from '@shared/config/environment';

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
    importProvidersFrom(BrowserAnimationsModule, MarkdownModule.forRoot()),
    provideNzIcons(usedNzIcons),
    { provide: NZ_I18N, useValue: en_US },
    provideAppConfig(environment),
  ],
};
