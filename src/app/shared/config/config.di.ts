
import { createInjectionToken } from '../utils';
import { AppConfig } from './config.model';

export const [injectAppConfig, provideAppConfig] =
  createInjectionToken<AppConfig>('Application level configuration');
