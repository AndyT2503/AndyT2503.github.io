import { bootstrapApplication } from '@angular/platform-browser';

import { appConfig } from './app.config';
import { AppComponent } from './app/app.component';

if (typeof window !== 'undefined' && window.location.hostname === 'andyt2503.github.io') {
  const targetUrl = new URL(
    window.location.pathname + window.location.search + window.location.hash,
    'https://tuhoangdev.netlify.app'
  ).href;
  window.location.replace(targetUrl);
} else {
  bootstrapApplication(AppComponent, appConfig);
}
