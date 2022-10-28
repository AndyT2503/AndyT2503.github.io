import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import en from '@angular/common/locales/en';
import { Component, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  PreloadAllModules,
  provideRouter,
  provideRoutes,
  RouterModule,
  withInMemoryScrolling,
  withPreloading,
} from '@angular/router';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
import { MarkdownModule } from 'ngx-markdown';

registerLocaleData(en);

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  standalone: true,
  imports: [RouterModule],
})
export class AppComponent {
  static bootstrap() {
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
          withPreloading(PreloadAllModules)
        ),
        importProvidersFrom(
          BrowserAnimationsModule,
          HttpClientModule,
          MarkdownModule.forRoot()
        ),
        { provide: NZ_I18N, useValue: en_US },
      ],
    }).catch((err) => console.error(err));
  }
}
