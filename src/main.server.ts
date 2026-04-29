import { provideServerRendering } from '@angular/platform-server';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/shared/config/app.config';

export default (context?: import('@angular/platform-browser').BootstrapContext) =>
  AppComponent.bootstrap(appConfig, [provideServerRendering()], context);
