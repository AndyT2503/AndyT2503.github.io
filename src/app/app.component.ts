import { registerLocaleData } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import en from '@angular/common/locales/en';
import { Component, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  PreloadAllModules,
  RouterModule,
  provideRouter,
  withComponentInputBinding,
  withPreloading,
} from '@angular/router';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { MarkdownModule } from 'ngx-markdown';
import { provideAppConfig } from './shared/config/config.di';
import { AppConfig } from './shared/config/config.model';

registerLocaleData(en);

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  standalone: true,
  imports: [RouterModule],
})
export class AppComponent {
  static bootstrap(config: AppConfig) {
    bootstrapApplication(this, {
      providers: [
        provideRouter(
          [
            {
              path: '',
              loadComponent: () =>
                import('./main/main.component').then((c) => c.MainComponent),
              loadChildren: () =>
                import('./main/main.routes').then((m) => m.mainRoutes),
            },
          ],
          withPreloading(PreloadAllModules),
          withComponentInputBinding()
        ),
        importProvidersFrom(BrowserAnimationsModule, MarkdownModule.forRoot()),
        provideHttpClient(),
        { provide: NZ_I18N, useValue: en_US },
        provideAppConfig(config),
      ],
    }).catch((err) => console.error(err));
  }
}
