import { registerLocaleData } from '@angular/common';
import { provideHttpClient, withFetch } from '@angular/common/http';
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
import {
  Component,
  EnvironmentProviders,
  Provider,
  importProvidersFrom,
} from '@angular/core';
import { BootstrapContext, bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  PreloadAllModules,
  RouterModule,
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
  withPreloading,
} from '@angular/router';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { MarkdownModule } from 'ngx-markdown';
import { provideAppConfig } from './shared/config/config.di';
import { AppConfig } from './shared/config/config.model';

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

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  standalone: true,
  imports: [RouterModule],
})
export class AppComponent {
  static bootstrap(
    config: AppConfig,
    extraProviders: Array<Provider | EnvironmentProviders> = [],
    context?: BootstrapContext,
  ) {
    return bootstrapApplication(this, {
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
          withComponentInputBinding(),
          withInMemoryScrolling({
            anchorScrolling: 'enabled',
            scrollPositionRestoration: 'enabled',
          }),
        ),
        importProvidersFrom(BrowserAnimationsModule, MarkdownModule.forRoot()),
        provideHttpClient(withFetch()),
        provideNzIcons(usedNzIcons),
        { provide: NZ_I18N, useValue: en_US },
        provideAppConfig(config),
        ...extraProviders,
      ],
    }, context);
  }
}
