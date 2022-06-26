import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import en from '@angular/common/locales/en';
import { Component, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';

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
        importProvidersFrom(
          RouterModule.forRoot(
            [
              {
                path: '',
                loadComponent: () =>
                  import('./main/main.component').then((c) => c.MainComponent),
              },
            ],
          ),
          HttpClientModule,
        ),
        importProvidersFrom(BrowserAnimationsModule),
        { provide: NZ_I18N, useValue: en_US }
      ],
    }).catch((err) => console.error(err));
  }
}
