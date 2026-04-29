import { AppComponent } from './app/app.component';
import { AppConfig } from './app/shared/config/config.model';
import { appConfig } from './app/shared/config/app.config';
import { provideClientHydration } from '@angular/platform-browser';

(async () => {
  void AppComponent.bootstrap(appConfig as AppConfig, [provideClientHydration()]);
})();
